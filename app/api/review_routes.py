from flask import Blueprint
from flask_login import current_user, login_required
from app.models import db, Review, Task, User
from app.forms import AddReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes('/')
def 

@review_routes.route('/', methods=['POST'])
