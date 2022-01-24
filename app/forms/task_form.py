from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, DecimalField
from wtforms.validators import DataRequired

class AddTaskForm(FlaskForm):
    animal = SelectField('animal', choices=('Any', 'Dog', 'Cat', 'Bird', 'Reptile', 'Misc'), validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    price = DecimalField('price', validators=[DataRequired()])
    category = SelectField('category', choices=('Exercise','Training', 'Boarding', 'Misc'), validators=[DataRequired()])
    pictures = StringField('pictures')
