# Build

## RAG image

building rag image takes some time because of sentence-transformers package which is quite large. Built image weights about 4.5GB

set `HF_TOKEN` environemnt variable in `.env` file.

```sh
docker compose build rag
```

run 

```sh
docker compose up rag
```

## At once

or everyting at once:

```sh
docker compose build 
```

```sh
docker compose up
```
# Django backend

```sh
cd infra
cp .env.example .env
```

and fill HF_TOKEN for ML service

generate secret key:

```sh
echo "API_SECRET_KEY=$(openssl rand -base64 32)" >> .env
```

migrate:
```sh
docker exec -it infra-django-1 python manage.py migrate
```
create superuser
```sh
docker exec -it infra-django-1 python manage.py createsuperuser
```

