from flask import Blueprint
from flask_login import current_user, login_required
from app.models import db, Review, Task, User
from app.forms import AddReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:id>', methods=['POST'])
@login_required
def edit_review(id):
    form = Review()
    form['csrf_token'].data = request.cookies['csrf_token']
    edited_review = Review.query.get(id)

    if form.validate_on_submit():
        edited_review.rating = form.data['rating']
        edited_review.review = form.data['review']
        edited_review.taskId = form.data['taskId']
        edited_review.userId = current_user.id

        db.session.commit()
        return edited_comment.to_dict()

@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    return {'DELETE':'SUCCESS'}
    
