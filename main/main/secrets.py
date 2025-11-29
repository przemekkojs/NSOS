import os
import boto3
import json

from botocore.exceptions import ClientError
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from mypy_boto3_secretsmanager import SecretsManagerClient
else:
    SecretsManagerClient = object


def get_secrets(
    secret_name: str, region_name: str = "eu-central-1"
) -> dict[str, str | None]:
    if os.getenv("USE_LOCAL_ENV", "False") == "True":
        return {
            "SECRET_KEY": os.getenv("SECRET_KEY"),
            "DATABASE_PASSWORD": os.getenv("DATABASE_PASSWORD"),
            "DEBUG": os.getenv("DEBUG", "True"),
            "AWS_SES_SENDER": os.getenv("AWS_SES_SENDER"),
            "AWS_SES_RECIPIENT": os.getenv("AWS_SES_RECIPIENT"),
            "AWS_SES_REGION": os.getenv("AWS_SES_REGION", "eu-central-1"),
        }

    session = boto3.session.Session()
    client: SecretsManagerClient = session.client(
        service_name="secretsmanager", region_name=region_name
    )

    try:
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)
        secrets = json.loads(get_secret_value_response["SecretString"])
        return secrets
    except ClientError as e:
        # For a list of exceptions thrown, see
        # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        raise e
