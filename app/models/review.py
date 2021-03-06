from .db import db

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    taskId = db.Column(db.Integer, db.ForeignKey('tasks.id'))
    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String(500), nullable=False)

    user = db.relationship('User', back_populates='reviews')
    tasks = db.relationship('Task',  back_populates='reviews')

    def to_dict(self):
        return {
            'id' : self.id,
            'userId' : self.userId,
            'taskId' : self.taskId,
            'rating' : self.rating,
            'review' : self.review
        }
