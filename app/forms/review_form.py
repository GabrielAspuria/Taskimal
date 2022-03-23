from flask_wtf import FlaskForm
from wtforms import TextAreaField, SelectField, IntegerField
from wtforms.validators import DataRequired

class AddReviewForm(FlaskForm):
    taskId = IntegerField('taskId')
    rating = SelectField('rating', choices=(('1'),('2'),('3'),('4'),('5')))
    review = TextAreaField('review', validators=[DataRequired()])
