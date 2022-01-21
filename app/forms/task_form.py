from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, DecimalField
from wtforms.validators import DataRequired

class AddTaskForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    price = DecimalField('price', validators=[DataRequired()])
    category = SelectField('category', choices=('Exercise','Training', 'Boarding', 'Misc'), validators=[DataRequired()])
    pictures = StringField('pictures')
