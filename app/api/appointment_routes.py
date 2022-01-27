from flask import Blueprint
from flask_login import login_required
from app.models import db, Appointment
from app.forms import AddAppointmentForm

appointment_routes = Blueprint('appointments', __name__)

@appointment_routes.route('/<int:userId>')
def index(userId):
    appointments = Appointment.get(userId)
    return {'appointments': [appointment.to_dict() for appointment in appointments]}

@appointment_routes.route('/', methods=['POST'])
@login_required

