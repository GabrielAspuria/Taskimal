from .db import db

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    animal = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    price = db.Column(db.Integer(),nullable=False)
    category = db.Column(db.String(20), nullable=False)
    pictures = db.Column(db.String(500))

    user = db.relationship('User', back_populates='tasks')
    appointments = db.relationship('Appointment', cascade=('all, delete'), back_populates='tasks')

    def to_dict(self):
        return {
            'id' : self.id,
            'userId' : self.userId,
            'animal' : self.animal,
            'name' : self.name,
            'description' : self.description,
            'price' : float(self.price),
            'category' : self.category,
            'pictures' : self.pictures
        }
