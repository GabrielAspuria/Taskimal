from flask import Blueprint, request
from app.forms import SearchForm
from app.models.task import task

search_routes = Blueprint('search', __name__, url_prefix='/search')

@search_routes.route('/', methods=['POST'])
def search():
    form = SearchForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    results = []
    if form.validate_on_submit():
        search = form.data['search']
        animal = Task.query.filter(Task.animal.ilike(f'%{search}%')).all()
        results.append(animal)
        name = Task.query.filter(Task.name.ilike(f'%{search}%')).all()
        results.append(name)
        
