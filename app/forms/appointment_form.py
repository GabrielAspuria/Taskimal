from flask_wtf import FlaskForm
from wtforms import DateTimeField
from wtforms.validators import DataRequired

class AddAppointmentForm(FlaskForm):
    date = DateTimeField('date', validators=[DataRequired()])
    time = DateTimeField('time', validators=[DataRequired()])
