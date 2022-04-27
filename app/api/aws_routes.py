import boto3
import botocore
from flask import Blueprint, request
from flask_login import login_required, current_user

from app.config import Config
from app.aws_s3 import *
from app.models import db, Task

file_routes = Blueprint('file', __name__)

@file_routes.route('/', methods=['POST'])
@login_required
def upload_file():
    if "file" not in request.files:
        return "No user_file key in request.files"

    file = request.files["file"]

    if file:
        file_url = upload_file_to_s3(file, Config.S3_BUCKET)
        # create an instance of your model
        file = File(
            userId=current_user.id,
            animal=request.form.get('animal'),
            name=request.form.get('name'),
            description=request.form.get('description'),
            price=request.form.get('price'),
            category=form.data.get('category'),
            pictures=form.data.get('pictures'),
        )
        db.session.add(file)
        db.session.commit()
        return file.to_dict()
    else: return "No File Attached!"
