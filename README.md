# Проект по предмету "Web-программирование"


## Развертывание

Для того, чтобы поднять данный микросервис, нужно:

1. Создать/изменить `.env` файл по пути `src/.env` со вставкой следующего содержимого:
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
3. Если контейнеры не поднялись, то нужно убедиться, что свободны порты `5433` и `8081`