## Backend Documentation

### Setup
1. Install brew https://brew.sh/
2. terminal: brew install python3
3. terminal: python3 install pip3
4. cd to /Backend
5. terminal: python3 -m venv venv
6. terminal: source venv/bin/activate
7. terminal: pip3 install -r requirements.txt
8. Install redis https://redis.io/topics/quickstart

### Running App
1. cd to /Backend (folder contains manage.py)
2. terminal: python3 manage.py runserver
3. terminal: redis-server (this is needed for channels/chat)

### API Doc
1. See word doc (work in progress)

### Working on
-

### Useful apps
1. Postman: to test APIs
2. DB Browser for SQLite: you can visualize data in db.sqlite3 from an app
3. https://websocketking.com/ (test websocket)

### Useful guides
1. knox authentication and react: https://medium.com/technest/implement-user-auth-in-a-django-react-app-with-knox-fc56cdc9211c
2. simple chat: https://medium.com/@9cv9official/simple-chat-app-using-django-channel-ed5032b79b9c
3. image upload: https://medium.com/@emeruchecole9/uploading-images-to-rest-api-backend-in-react-js-b931376b5833
