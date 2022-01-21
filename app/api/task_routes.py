from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Task, db
from app.forms import AddTaskForm

task_routes = Blueprint('tasks', __name__)

@task_routes.route('/')
def index():
    tasks = Task.query.all()
    return {'tasks': [task.to_dict() for task in tasks]}

@task_routes.route('/exercise')

@task_routes.route('/training')

@task_routes.route('/boarding')

@task_routes.route('/misc')
