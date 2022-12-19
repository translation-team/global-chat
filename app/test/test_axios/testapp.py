from fastapi import FastAPI,Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

import sys, os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))))

from database.database import SessionLocal, ENGINE
from database.model import Base, MessageHistory, OriginMessage
from database.schema import MessageHistorySchma, OriginCreate, HistoryCreate

import re

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

# db 연결
Base.metadata.create_all(ENGINE)

def get_db():
    db = SessionLocal()

    try:
        yield db
    except Exception as e:
        pass
    finally:
        db.close()

#화면에 html 파일 출력 & 채팅 정보 전체 읽기.
@app.get('/api/v1/chat')
async def index():
    
    return FileResponse('templates/index2.html') 


# DB(origin_message, Message_history)에 저장
@app.post('/api/v1/chat')
async def get_messsage(msg:MessageHistorySchma, db=Depends(get_db)):
    
    # 한글/영어 구분
    word=msg.contents
    
    reg = re.compile(r'[a-zA-Z]')
    ori_Lang='ko'
    if reg.match(word):
        ori_Lang='en'
    else:
        ori_Lang='ko'
        
    # (origin_message) DB 저장
    message = OriginCreate(
        body=msg.contents, 
        lang=ori_Lang
    )
    
    origin_message = OriginMessage(**message.dict())
    
    try:
        db.add(origin_message)
        db.commit()
    except Exception as e:
        print("에러")
        return {'fail':'실패'}

    #(message_history) DB 저장
    history=HistoryCreate(
        room_id=msg.room_id,
        from_id=msg.from_id,
        to_id=msg.to_id,
        origin_id=origin_message.id #foreign key
    )
    
    message_history=MessageHistory(**history.dict())

    try:
        db.add(message_history)
        db.commit()
        return {'success':'성공'}
    except Exception as e:
        print("에러")
        return {'fail':'실패2'}
    