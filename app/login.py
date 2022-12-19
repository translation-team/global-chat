from datetime import datetime, timedelta
from typing import Optional

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt

from passlib.context import CryptContext

from pydantic import BaseModel
import uvicorn

from database.database import SessionLocal, ENGINE
from database.model import Base, User
from main import get_db
from database.schema import UserCreate


SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto') 
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')

app = FastAPI()


def verify_password(input_password, db_password):
    return pwd_context.verify(input_password, db_password)

def get_password_hash(password):
    return pwd_context.hash(password)


def get_userinfo(username: str): # username으로 조회할지, primary_key인 id로 조회할지...
    db = get_db()
    try:
        user_info = next(db).query(User).filter(User.username == username).first()
        return user_info
    
    except Exception as e:
        print('db에서 유저를 조회할 수 없습니다')
        return "db에서 유저를 조회할 수 없습니다"


def authenticate_user(username: str, password: str):
    db = get_db()
    userinfo = get_userinfo(username, db)
    db_password = next(db).session.query(User).filter(User.username == username).first().hashpw

    if not userinfo:
        return False
    if not verify_password(password, db_password):
        return False
    
    return userinfo


# 토큰 발급
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow()
    to_encode.update({'exp': expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)):    
    credential_exception = HTTPException(
        status_code = status.HTTP_401_UNAUTHORIZED,
        detail='인증되지 않았습니다',
        headers={'WWW-Authenticate': 'Bearer'}
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        username: str = payload.get('sub')
        if username is None:
            raise credential_exception
        token_data = TokenData(username=username)
    
    except JWTError:
        raise credential_exception

    user_info = get_userinfo(username=token_data.username)
    db = get_db()
    if user_info is None:
        raise credential_exception
    return user_info


@app.post('/api/v1/login', response_model=Token)
async def login_with_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(username = form_data.username, password = form_data.password)
    if not user:
            raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail = 'Incorrect username or password',
            headers={'WWW-Authenticate': 'Bearer'}
            )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={'sub' : user.username},
        expires_delta=access_token_expires
    )
    return {'access_token': access_token, 'token_type': 'bearer'}

