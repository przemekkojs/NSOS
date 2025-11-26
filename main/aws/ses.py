import os
import boto3

from typing import override, TYPE_CHECKING
from botocore.exceptions import ClientError
from abc import ABC, abstractmethod

if TYPE_CHECKING:
    from mypy_boto3_ses import SESClient
else:
    SESClient = object

SUBJECT = "Base subject line of an email"
BODY_TEXT = (
    "AMAzon SES Test (Python) \r\n"
    "This email was sent with Amazon SES using the AWS SDK for python (boto)"
)

BODY_HTML = """<html>
<head></head>
<body>
    <h1>Amazon SES Test (SDK for Python)</h1>
    <p>This email was sent with
    <a href='https://aws.amazon.com/ses/'>Amazon SES</a> using the 
    <a href='https://aws.amazon.com/sdk-for-python/'>
    AWS SDK for Python (Boto) </a>.</p>
</body>
</html>
"""

CHARSET = "UTF-8"


class SendService(ABC):
    @abstractmethod
    def send(self):
        raise NotImplementedError


class EmailService(SendService):
    _client: SESClient

    def __init__(self):
        self._client = boto3.client(
            "ses",
            region_name=os.getenv("AWS_SES_REGION"),
            aws_access_key_id=os.getenv("AWS_ACCESS_KEY"),
            aws_secret_access_key=os.getenv("AWS_SECRET_KEY"),
        )

    @override
    def send(self):
        sender = os.getenv("AWS_SES_SENDER")
        recipient = os.getenv("AWS_SES_RECIPIENT")

        if recipient is None:
            raise Exception("AWS_SES_RECIPIENT not set")

        if sender is None:
            raise Exception("AWS_SES_SENDER not set")

        try:
            response = self._client.send_email(
                Destination={"ToAddresses": [recipient]},
                Message={
                    "Body": {
                        "Html": {
                            "Charset": CHARSET,
                            "Data": BODY_HTML,
                        },
                        "Text": {
                            "Charset": CHARSET,
                            "Data": BODY_TEXT,
                        },
                    },
                    "Subject": {
                        "Charset": CHARSET,
                        "Data": SUBJECT,
                    },
                },
                Source=sender,
            )
        except ClientError as e:
            print(e.response["Error"]["Message"])
        else:
            print(f"Email sent! Message ID: {response['MessageId']}")
