from .db import db

class Appointment(db.Model):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    taskId = db.Column(db.Integer, db.ForeignKey('tasks.id'))
