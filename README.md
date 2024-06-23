# Проект по предмету "Web-программирование"


## Развертывание

Для того, чтобы поднять данный микросервис, нужно:

1. Создать/изменить `.env` файл по руту `src/.env` со вставкой следующего содержимого:
```
PORT=8081
PROD=true
SECRET_WORD=YOUR_SECRET_WORD
REFRESH_TOKEN_EXPIRY=2592000
ACCESS_TOKEN_EXPIRY=86400
SALT_ROUNDS=10
DB_HOST=authservice_db
DB_PORT=5433
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=authservice_db
```

2. В руте ввести `docker-compose up -d`
3. В случае, если контейнеры не поднимаются, то нужно убедиться, 
что существует сетка `app` командой `docker network ls`, а также, что свободны порты `8081` и `5433`
(Конечно, можно поменять порты, однако это нужно делать не только в .env, но и в docker-compose.yml, 
так как не получилось пробросить .env файл в контекст compose'а :( )