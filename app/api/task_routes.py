from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import Task, db, Appointment, Review
from app.forms import AddTaskForm, AddAppointmentForm
import boto3
import botocore
from app.config import Config
from app.aws_s3 import upload_file_to_s3
task_routes = Blueprint('tasks', __name__)

@task_routes.route('/')
def index():
    tasks = Task.query.all()
    return {'tasks': [task.to_dict() for task in tasks]}

@task_routes.route('/', methods=['POST'])
@login_required
def add_task():
    # form = AddTaskForm()
    # form['csrf_token'].data = request.cookies['csrf_token']

    # if form.validate_on_submit():
    #     task = Task(
    #         animal=form.data['animal'],
    #         name=form.data['name'],
    #         description=form.data['description'],
    #         price=form.data['price'],
    #         category=form.data['category'],
    #         pictures=form.data['pictures'],
    #         userId=current_user.id
    #     )
    #     db.session.add(task)
    #     db.session.commit()
    #     return task.to_dict()
    # return form.errors

    if "file" not in request.files:
        return "no user_file key in request.files"

    file = request.files["file"]
    print('QQQQQQQQQQ', file)

    upload = upload_file_to_s3(file, Config.S3_BUCKET)

    if file:
        file = Task(
            userId=request.form.get('userId'),
            animal=request.form.get('animal'),
            name=request.form.get('name'),
            description=request.form.get('description'),
            price=request.form.get('price'),
            category=request.form.get('category'),
            pictures=upload,
        )
        db.session.add(file)
        db.session.commit()
        return file.to_dict()
    return "No file attached!"

@task_routes.route('/<int:id>', methods=['PUT'])
def edit_task(id):
    edited_task = Task.query.get(id)
    form = AddTaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        edited_task.animal=form.data['animal'],
        edited_task.name=form.data['name'],
        edited_task.description=form.data['description'],
        edited_task.price=form.data['price'],
        edited_task.category=form.data['category'],
        edited_task.pictures=form.data['pictures'],
        edited_task.userId=current_user.id

        db.session.commit()
        return edited_task.to_dict()
    return form.errors

@task_routes.route('/<int:id>/appointments', methods=['POST'])
def add_appointment(id):
    form = AddAppointmentForm()
    task = Task.query.get(id)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        appointment = Appointment(
            userId=current_user.id,
            taskId=task.id,
            year=form.data['year'],
            month=form.data['month'],
            day=form.data['day'],
            time=form.data['time'],
            ap=form.data['ap']
        )

        db.session.add(appointment)
        db.session.commit()
        return appointment.to_dict()
    return form.errors


@task_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_task(id):
    task = Task.query.get(id)
    db.session.delete(task)
    db.session.commit()
    return {"Delete":"Success"}

@task_routes.route('/<int:id>/reviews')
def get_reviews(id):
    reviews = Review.query.filter(Review.taskId == id).all()
    return {'reviews': [review.to_dict() for review in reviews]}
