from typing import override, TYPE_CHECKING
import boto3

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
            region_name=AWS_REGION,
            aws_access_key_id=ACCESS_KEY,
            aws_secret_access_key=SECRET_KEY,
        )

    @override
    def send(self):
        try:
            self._client.send_email(
                Destination={"ToAddresses": [RECIPIENT]},
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
                Source=SENDER,
            )
        except ClientError as e:
            print(e.response["Error"]["Message"])
        else:
            print("Email sent! Message ID: ")
