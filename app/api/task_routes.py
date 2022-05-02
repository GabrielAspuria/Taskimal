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
    # if "image" not in request.files:
    #     return {"errors": "image required"}, 400

    # image = request.files["image"]

    # if not allowed_file(image.filename):
    #     return {"errors": "file type not permitted"}, 400

    # userId = request.form["userId"]
    # animal = request.form["animal"]
    # name = request.form["name"]
    # description = request.form["description"]
    # price = request.form["price"]
    # category = request.form["category"]

    print('QQQQQQQQQQ',request.files)
    if "file" not in request.files:
        return "no user_file key in request.files"

    file = request.files["file"]

    if file:
        file_url = upload_file_to_s3(file, Config.S3_BUCKET)
        file = Task(
            userId=request.form.get('userId'),
            animal=request.form.get('animal'),
            name=request.form.get('name'),
            description=request.form.get('description'),
            price=request.form.get('price'),
            category=request.form.get('category'),
            pictures=file_urlell,
    )
        db.session.add(file)
        db.session.commit()
        return file.to_dict()
    return "No file attached!"

    # print("REQQQQQQQQQQQQQQQQQQQQ", request.files)

    # image.filename = get_unique_filename(image.filename)

    # upload = upload_file_to_s3(image)

    # if "url" not in upload:
    #     # if the dictionary doesn't have a url key
    #     # it means that there was an error when we tried to upload
    #     # so we send back that error message
    #     return upload, 400

    # url = upload["url"]

    # new_task = Task(
    #     userId=userId,
    #     animal=animal,
    #     name=name,
    #     description=description,
    #     price=price,
    #     category=category,
    # )
    # db.session.add(new_task)
    # db.session.commit()
    # return {'pictures': url}

    # try:
    #     new_task = {
    #         'userId': userId,
    #         'animal': animal,
    #         'description': description,
    #         'name': name,
    #         'price': price,
    #         'category': category,
    #         'pictures': url,
    #     }

    #     new_task_db = Task(
    #         **new_task
    #     )
    #     db.session.add(new_task_db)
    #     db.session.commit()
    #     # return task.to_dict()

    #     new_task_return = {
    #         'id': new_task_db.id,
    #         'userId': new_task_db.userId,
    #         'animal': new_task_db.animal,
    #         'description': new_task_db.description,
    #         'name': new_task_db.name,
    #         'price': new_task_db.price,
    #         'category': new_task_db.category,
    #         'pictures': new_task_db.pictures
    #     }
    #     return jsonify(new_task_return)
    # except IntegrityError as e:
    #     return jsonify('Data error'), 400


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
