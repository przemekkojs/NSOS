import os
import boto3
import json

from botocore.exceptions import ClientError
from typing import TYPE_CHECKING, Literal, cast
from dataclasses import dataclass

if TYPE_CHECKING:
    from mypy_boto3_secretsmanager import SecretsManagerClient
else:
    SecretsManagerClient = object


@dataclass
class Secrets:
    SECRET_KEY: str
    DB_ENGINE: Literal["sqlite3", "postgresql"]
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str
    DB_HOST: str
    DB_PORT: int
    DEBUG: bool
    AWS_SES_SENDER: str
    AWS_SES_RECIPIENT: str
    AWS_DEFAULT_REGION: str
    ALLOWED_HOSTS: list[str]
    CORS_ALLOWED_ORIGINS: list[str]
    ENV: Literal["dev", "staging", "production"]
    FRONTEND_URL: str
    S3_BUCKET_NAME: str | None = None
    AWS_PROFILE: str | None = None


def get_required_env(key: str) -> str:
    """Get environment variable or raise error if not found."""
    value = os.getenv(key)
    if value is None:
        raise ValueError(f"Required environment variable "{key}" is not set")
    return value


def get_secrets(secret_name: str, region_name: str = "eu-central-1") -> Secrets:
    if os.getenv("USE_LOCAL_ENV", "False") == "True":
        return Secrets(
            SECRET_KEY=get_required_env("SECRET_KEY"),
            DB_PASSWORD=get_required_env("DB_PASSWORD"),
            DB_NAME=get_required_env("DB_NAME"),
            DB_USER=get_required_env("DB_USER"),
            DB_HOST=get_required_env("DB_HOST"),
            DB_PORT=int(get_required_env("DB_PORT")),
            DEBUG=os.getenv("DEBUG", "False") == "True",
            AWS_SES_SENDER=get_required_env("AWS_SES_SENDER"),
            AWS_SES_RECIPIENT=get_required_env("AWS_SES_RECIPIENT"),
            AWS_DEFAULT_REGION=get_required_env("AWS_DEFAULT_REGION"),
            ALLOWED_HOSTS=get_required_env("ALLOWED_HOSTS").split(","),
            CORS_ALLOWED_ORIGINS=get_required_env("CORS_ALLOWED_ORIGINS").split(","),
            ENV=cast(Literal["dev", "staging", "production"], os.getenv("ENV", "dev")),
            DB_ENGINE=cast(
                Literal["sqlite3", "postgresql"], get_required_env("DB_ENGINE")
            ),
            FRONTEND_URL=get_required_env("FRONTEND_URL"),
            AWS_PROFILE=os.getenv("AWS_PROFILE"),
            S3_BUCKET_NAME=os.getenv("S3_BUCKET_NAME"),
        )

    session = boto3.session.Session()
    client: SecretsManagerClient = session.client(
        service_name="secretsmanager", region_name=region_name
    )

    try:
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)
        secret_dict = json.loads(get_secret_value_response["SecretString"])

        return Secrets(
            SECRET_KEY=secret_dict.get("SECRET_KEY"),
            DB_ENGINE=secret_dict.get("DB_ENGINE"),
            DB_PASSWORD=secret_dict.get("DB_PASSWORD"),
            DB_NAME=secret_dict.get("DB_NAME"),
            DB_USER=secret_dict.get("DB_USER"),
            DB_HOST=secret_dict.get("DB_HOST"),
            DB_PORT=int(secret_dict.get("DB_PORT")),
            AWS_SES_SENDER=secret_dict.get("AWS_SES_SENDER"),
            AWS_SES_RECIPIENT=secret_dict.get("AWS_SES_RECIPIENT"),
            AWS_DEFAULT_REGION=secret_dict.get("AWS_DEFAULT_REGION"),
            ALLOWED_HOSTS=secret_dict.get("ALLOWED_HOSTS").split(","),
            CORS_ALLOWED_ORIGINS=secret_dict.get("CORS_ALLOWED_ORIGINS").split(","),
            FRONTEND_URL=secret_dict.get("FRONTEND_URL"),
            ENV="production",
            DEBUG=False,
            S3_BUCKET_NAME=secret_dict.get("S3_BUCKET_NAME"),
        )
    except ClientError as e:
        # For a list of exceptions thrown, see
        # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        raise e
