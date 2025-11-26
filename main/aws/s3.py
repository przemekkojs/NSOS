import os
import boto3
from boto3.exceptions import S3UploadFailedError
from botocore.exceptions import ClientError

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from mypy_boto3_s3 import S3Client
    from mypy_boto3_s3.service_resource import Bucket
else:
    S3Client = object
    Bucket = object


USER_BUCKET_NAME = "nsos-user-data"


class BucketService:
    _client: S3Client
    _bucket: Bucket

    def __init__(self):
        self._client = boto3.client(
            "s3",
            region_name=os.getenv("AWS_S3_REGION"),
            aws_access_key_id=os.getenv("AWS_ACCESS_KEY"),
            aws_secret_access_key=os.getenv("AWS_SECRET_KEY"),
        )

        self._bucket = boto3.resource("s3").Bucket(USER_BUCKET_NAME)

    def put(self):
        object_name = "?"
        obj = self._bucket.Object(os.path.basename(object_name))
        try:
            obj.upload_file(object_name)
        except S3UploadFailedError as err:
            print(f"Couldn't upload file {object_name} to {self._bucket.name}")
            print(f"\t{err}")

    def delete(self, key: str):
        try:
            object = self._bucket.Object(key)
            object.delete()
            object.wait_until_not_exists()
        except ClientError:
            print(
                f"Couldn't delete object {object.key} from bucket {self._bucket.name}"
            )
            raise

    def generate_presigned_url(self, client_method: str) -> str:
        try:
            url = self._client.generate_presigned_url(
                ClientMethod=client_method,
            )
            return url
        except ClientError:
            print(f"Couldn't get a presigned URL for client method {client_method}")
            raise
