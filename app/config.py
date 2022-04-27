import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
    # (only 'postgresql') but heroku's postgres add-on automatically sets the
    # url in the hidden config vars to start with postgres.
    # so the connection uri must be updated here
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL').replace('postgres://', 'postgresql://')
    SQLALCHEMY_ECHO = True
    
    S3_BUCKET = os.environ.get("taskimalbucket")
    S3_KEY = os.environ.get("AKIASWBZI4G4MPZYMVMU")
    S3_SECRET = os.environ.get("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")
    S3_LOCATION = f"http://{S3_BUCKET}.s3.amazonaws.com/"
