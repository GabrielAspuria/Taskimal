import boto3
import botocore
from .config import Config

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'svg'}

s3 = boto3.client(
   "s3",
   aws_access_key_id=Config.S3_KEY,
   aws_secret_access_key=Config.S3_SECRET
)

BUCKET_NAME = Config.S3_BUCKET
print(BUCKET_NAME)
print(Config.S3_KEY)
print(Config.S3_SECRET)
print(Config.S3_LOCATION)

def upload_file_to_s3(file, acl="public-read"):

    try:

        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                # "ACL": acl,
                "ContentType": file.content_type
            }
        )

    except Exception as e:
        # This is a catch all exception, edit this part to fit your needs.
        print('EEEEEE', str(e))
        return {'errors': str(e)}


    return f"{Config.S3_LOCATION}{file.filename}"
