from flask_wtf import FlaskForm
from wtforms import TextAreaField, SelectField
from wtforms.validators import DataRequired

class AddReviewForm(FlaskForm):
    rating = SelectField('rating', choices=(1,2,3,4,5), validators=[DataRequired()])
    review = TextAreaField('review', validators=[DataRequired()])
