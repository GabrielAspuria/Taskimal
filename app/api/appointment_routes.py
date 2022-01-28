from flask import Blueprint
from flask_login import login_required
from app.models import db, Appointment
from app.forms import AddAppointmentForm

appointment_routes = Blueprint('appointments', __name__)

@appointment_routes.route('/')
def index():
    appointments = Appointment.query.all()
    return {'appointments': [appointment.to_dict() for appointment in appointments]}

@appointment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_appointment(id):
    appointment = Appointment.query.get(id)
    db.session.delete(appointment)
    db.session.commit()
    return {"Delete": "Success"}
