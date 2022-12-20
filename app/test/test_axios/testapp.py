from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount('/static',StaticFiles(directory='statics'),name='static')

origins =[
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://127.0.0.1:8080',
    'http:localhost:8080'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class User(BaseModel):
    firstname:str
    age:int

# axios 테스트
@app.post('/api/user')
async def get_user(user:User):
    print(user)

    return {'hello':'world'}

@app.get('/')
async def index():
    return FileResponse('templates/index.html')
