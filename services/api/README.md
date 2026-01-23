# Run locally

setup using uv (best) or pip.

Create venv with required python version:

```sh
uv venv
```

Enable it:
```sh
source .venv/bin/activate
```

Install (sync) packages:
```sh
uv sync
```

Create superuser

```sh
python3 manage.py createsuperuser
```
