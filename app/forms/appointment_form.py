from flask_wtf import FlaskForm
from wtforms import DateTimeField
from wtforms.validators import DataRequired

class AddAppointmentForm(FlaskForm):
    appointmentDate = DateTimeField('date', validators=[DataRequired()])
