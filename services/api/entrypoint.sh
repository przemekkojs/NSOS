#!/bin/bash
set -e 

python manage.py migrate --noinput

python manage.py collectstatic --noinput

exec uvicorn main.asgi:application --host 0.0.0.0 --port 8000
