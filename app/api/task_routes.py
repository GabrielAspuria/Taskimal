from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import Task, db
from app.forms import AddTaskForm

task_routes = Blueprint('tasks', __name__)

@task_routes.route('/')
def index():
    tasks = Task.query.all()
    return {'tasks': [task.to_dict() for task in tasks]}

@task_routes.route('/', methods=['POST'])
@login_required
def add_task():
    form = AddTaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        task = Task(
            animal=form.data['animal'],
            name=form.data['name'],
            description=form.data['description'],
            price=form.data['price'],
            category=form.data['category'],
            pictures=form.data['pictures'],
            userId=current_user.id
        )

        db.session.add(task)
        db.session.commit()
        return task.to_dict()
    return form.errors

@task_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_task(id):
    task = Task.query.get(id)
    form = AddTaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        task.animal=form.data['animal'],
        task.name=form.data['name'],
        task.description=form.data['description'],
        task.price=form.data['price'],
        task.category=form.data['category'],
        task.pictures=form.data['pictures'],
        task.userId=current_user.id

        db.session.commit()
        return task.to_dict()

@task_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_task(id):
    task = Task.query.get(id)
    db.session.delete(task)
    db.session.commit()
    return {"Delete":"Success"}
