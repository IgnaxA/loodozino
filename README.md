# Проект по предмету "Web-программирование"


## Развертывание

Для того, чтобы поднять данный микросервис, нужно:

1. Создать/изменить `.env` файл по руту `src/.env` со вставкой следующего содержимого:
```
PORT=8079
PROD=true
DB_HOST=profileservice_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_PORT=5434
DB_NAME=profileservice_db
AUTH_API_HOST=authservice_back
AUTH_API_PORT=8081
AUTH_API_PREFIX=/api/authservice
AUTH_API_PROTOCOL=http://
```

2. В руте ввести `docker-compose up -d`
3. В случае, если контейнеры не поднимаются, то нужно убедиться,
   что существует сетка `app` командой `docker network ls`, а также, что свободны порты `8079` и `5434`