from flask import Blueprint
from flask_login import current_user, login_required
from app.models import db, Appointment
from app.forms import AddAppointmentForm

appointment_routes = Blueprint('appointments', __name__)

@appointment_routes.route('/')
def index():
    appointments = Appointment.query.all()
    return {'appointments': [appointment.to_dict() for appointment in appointments]}

@appointment_routes.route('/', methods=['POST'])
@login_required
def add_appointment():
    form = AddAppointmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        appointment = Appointment(
            userId=current_user.id,
            taskId=form.data['taskId'],
            appointmentData=form.data['appointmentData']
        )

        db.session.add(appointment)
        db.session.commit()
        return appointment.to_dict()
    return form.errors

# @appointment.routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def delete_appointment(id):
#     appointment = Appointment.query.get(id)
#     db.session.delete(appointment)
#     db.session.commit()
#     return {"Delete":"Success"}
