from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired

class AddAppointmentForm(FlaskForm):
    year = IntegerField('year', validators=[DataRequired()])
    month = SelectField('month', choices=(('Jan'),('Feb'),('Mar'),('Apr'),('May'),('Jun'),('Jul'),('Aug'),('Sep'),('Oct'),('Nov'),('Dec')), validators=[DataRequired()])
    day = IntegerField('day', validators=[DataRequired()])
    time = SelectField('time', choices=(('1'), ('2'), ('3'), ('4'), ('5'), ('6'), ('7'), ('8'), ('9'), ('10'), ('11'), ('12')), validators=[DataRequired()])
    ap = SelectField('ap', choices=('AM', 'PM'), validators=[DataRequired()])
