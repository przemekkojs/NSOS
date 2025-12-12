# --- STAGE 1: BUILDER STAGE ---
FROM python:3.13-slim-bookworm AS builder

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies for building Python packages
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy requirement files and install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /wheels -r requirements.txt


# --- STAGE 2: PRODUCTION STAGE ---
FROM python:3.13-slim-bookworm AS final

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app/main
ENV DJANGO_SETTINGS_MODULE=main.settings

# Install run-time dependencies
RUN apt-get update && apt-get install -y \
    libpq5 \
    gettext \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd --create-home --shell /bin/bash appuser

WORKDIR /app

# Copy built wheels from the builder stage and install
COPY --from=builder /wheels /wheels
RUN pip install --no-cache-dir /wheels/*

COPY --chown=appuser:appuser . /app/

USER appuser

EXPOSE 8000

# Default command
ENTRYPOINT ["uvicorn", "main.asgi:application", "--host", "0.0.0.0", "--port", "8000"]