from .db import db

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    price = db.Column(db.Integer(),nullable=False)
    category = db.Column(db.String(20), nullable=False)
    pictures = db.Column(db.String(280))

    user = db.relationship('User', back_populates='tasks')

    def to_dict(self):
        return {
            'id' : self.id,
            'userId' : self.userId,
            'name' : self.name,
            'description' : self.description,
            'price' : self.price,
            'category' : self.category,
            'pictures' : self.pictures
        }
