from flask_wtf import FlaskForm
from wtforms.validators import DataRequired
from wtforms import StringField

class SearchForm(FlaskForm):
  search = StringField('search', validators=[DataRequired()])
