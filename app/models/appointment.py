from .db import db

class Appointment(db.Model):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    taskId = db.Column(db.Integer, db.ForeignKey('tasks.id'))
    month = db.Column(db.String(50), nullable=False)
    day = db.Column(db.Integer, nullable=False)
    time = db.Column(db.Integer, nullable=False)
    ap = db.Column(db.String(50), nullable=False)


    user = db.relationship('User', back_populates='appointments')
    tasks = db.relationship('Task', back_populates='appointments')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'taskId': self.taskId,
            'month': self.month,
            'day': self.day,
            'time': self.time,
            'ap': self.ap
        }
