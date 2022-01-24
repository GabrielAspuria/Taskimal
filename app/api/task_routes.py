from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Task, db
from app.forms import AddTaskForm

task_routes = Blueprint('tasks', __name__)

@task_routes.route('/')
def index():
    tasks = Task.query.all()
    return {'tasks': [task.to_dict() for task in tasks]}

# @task_routes.route('/Exercise')
# def exercise():
#     exercises = Task.query.filter(Task.category == 'Exercise')
#     return {'exercises': [exercise.to_dict() for exercise in exercises]}

# @task_routes.route('/training')
# def training():

# @task_routes.route('/boarding')
# def boarding():

# @task_routes.route('/misc')
# def misc():
