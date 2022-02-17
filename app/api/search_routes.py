from flask import Blueprint, request
from app.forms import SearchForm
from app.models.task import Task

search_routes = Blueprint('search', __name__, url_prefix='/search')

@search_routes.route('/', methods=['POST'])
def search():
    form = SearchForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    results = []
    if form.validate_on_submit():
        search = form.data['search']
        animal_results = Task.query.filter(Task.animal.ilike(f'%{search}%')).all()
        results.append(animal_results)
        name_results = Task.query.filter(Task.name.ilike(f'%{search}%')).all()
        results.append(name_results)

        search_results = [task for subtask in results for task in subtask]
        return {'tasks': [task.to_dict() for task in set(search_results)]}
    return form.errors
