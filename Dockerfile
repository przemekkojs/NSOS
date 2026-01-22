# --- STAGE 1: BUILDER STAGE ---
FROM python:3.13-slim-bookworm AS builder
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV UV_NO_DEV=1

# Install system dependencies for building Python packages
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       libpq-dev \
    && rm -rf /var/lib/apt/lists/*

RUN pip install uv

# --- STAGE 2: PRODUCTION STAGE ---
FROM python:3.13-slim-bookworm AS final

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app/main
ENV DJANGO_SETTINGS_MODULE=main.settings
ENV UV_NO_DEV=1

# Install run-time dependencies
RUN apt-get update && apt-get install -y \
    libpq5 \
    gettext \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd --create-home --shell /bin/bash appuser

WORKDIR /app

COPY --from=builder /usr/local/bin/uv /usr/local/bin/uv
COPY uv.lock .
COPY requirements.txt .

RUN uv pip sync --system requirements.txt

COPY --chown=appuser:appuser . /app/

RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 8000

# Default command
CMD ["uvicorn", "main.asgi:application", "--host", "0.0.0.0", "--port", "8000"]
