from flask import Blueprint, request
# from app.forms import SearchForm
from app.models.task import Task

search_routes = Blueprint('search', __name__, url_prefix='/search')

# @search_routes.route('/', methods=['POST'])
# def search():
#     form = SearchForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     results = []
#     if form.validate_on_submit():
#         search = form.data['search']
#         # search = request.args.get('q')
#         animal_results = Task.query.filter(Task.animal.ilike(f'%{search}%')).all()
#         results.append(animal_results)
#         name_results = Task.query.filter(Task.name.ilike(f'%{search}%')).all()
#         results.append(name_results)

#         search_results = [task for result in results for task in result]
#         # print("RESULTSSSSSSSSSSS:", {'tasks': [task.to_dict() for task in set(search_results)]})
#         return {'tasks': [task.to_dict() for task in set(search_results)]}
#     term = request.args.get('q')
#     search_res = Task.query.filter(Task.animal.ilike(f'%{term}%')).all()
#     print("SEARCHHHHHHHHHHH", search_res)
#     # return form.errors

@search_routes.route('')
def search():
    search = request.args.get('q')
    animal_search = Task.query.filter(Task.animal.ilike(f'%{search}%')).all()
    name_search = Task.query.filter(Task.name.ilike(f'%{search}%')).all()
    if animal_search:
        result = {task.id : task.to_dict() for task in animal_search}
        print("RESULTTTTTTTTTTTTTTT", result)
        return { "tasks" : result }
    if name_search:
        result = {task.id : task.to_dict() for task in name_search}
        return { "tasks": result }
    else:
        return { "tasks" : {}}
