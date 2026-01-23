import boto3
import logging

from typing import TYPE_CHECKING
from botocore.exceptions import ClientError
from main.conf import settings

if TYPE_CHECKING:
    from mypy_boto3_ses import SESClient
else:
    SESClient = object

logger = logging.getLogger(__name__)

CHARSET = "UTF-8"


class EmailService:
    _client: SESClient

    def __init__(self):
        self._client = boto3.client(
            "ses",
        )

    def send(
        self,
        *,
        subject: str,
        body_text: str,
        body_html: str,
        recipient: str | None = None,
        sender: str | None = None,
    ) -> str:
        sender = sender or settings.secrets.AWS_SES_SENDER
        recipient = sender or settings.secrets.AWS_SES_RECIPIENT

        try:
            response = self._client.send_email(
                Destination={"ToAddresses": [recipient]},
                Message={
                    "Body": {
                        "Html": {
                            "Charset": CHARSET,
                            "Data": body_html,
                        },
                        "Text": {
                            "Charset": CHARSET,
                            "Data": body_text,
                        },
                    },
                    "Subject": {
                        "Charset": CHARSET,
                        "Data": subject,
                    },
                },
                Source=sender,
            )
            return response["MessageId"]
        except ClientError as e:
            logger.error(f"Failed to send email: {e}")
            raise
