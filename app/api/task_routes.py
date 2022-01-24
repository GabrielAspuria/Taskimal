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
def add_task():
    form = AddTaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    json = request.json
    form.data['animal'] = json['animal']
    form.data['name'] = json['name']
    form.data['description'] = json['description']
    form.data['price'] = json['price']
    form.data['category'] = json['category']
    form.data['pictures'] = json['pictures']

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
        return jsonify(task.to_dict())
    return jsonify(form.errors)
