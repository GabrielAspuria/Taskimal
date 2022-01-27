from .db import db

class Appointment(db.Model):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    taskId = db.Column(db.Integer, db.ForeignKey('tasks.id'))
    appointmentDate = db.Column(db.DateTime, nullable=False)

    user = db.relationship('User', back_populates='appointments')
    tasks = db.relationship('Task', back_populates='appointments')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'taskId': self.taskId,
            'appointmentDate': self.appointmentDate
        }
