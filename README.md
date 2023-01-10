# Backend

가상환경(conda, venv) 버전: python 3.8.5

라이브러리는 requirements.txt에 저장 됨 : pip install -r requirements.txt

global_chat.db 만들기 : 그냥 새 파일로,

서버 실행: app 폴더로 이동 한 후, uvicorn main:app --port=8080 --reload

DB 생성 했고 app/database/ 에 DB 관련 설정 했으니 이거 참조하면 개발하면 됨.

URL은 노션에 있는 URL 기반으로 참조해서 작성해주세요.

- 개발하면서 URL 수정 가능 합니다.( 카톡으로 알려주세요)

일단 react 페이지는 사용하지 않고 각자 간단한 페이지 작성해서 회원가입,로그인/로그아웃, 채팅 구현한 다음 마지막에 react에 넣어 주는 방식을 취해야 될 거 같습니다.

각자 개발 했으면 backend 브랜치에 commit 하지 말고 새로 브랜치 만들어서 commit 해주세요.

<추가로~~>

pip install -r requirements.txt 다시 해주시고

app/test 에 axios 랑 websocket 테스트 한 코드 있으니 참고 하세요.
