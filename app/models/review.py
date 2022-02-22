from .db import db

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey=('users.id'))
    taskId = db.Column(db.Integer, db.ForeignKey=('tasks.id'))
    review = db.Column(db.String(300), nullable=False)
    rating = db.Column(db.Integer(), nullable=False)

    user = db.relationship('User', back_populates='review')
    task = db.relationship('Task', back_populates='review')

    def to_dict(self):
        return {
            'id' = self.id,
            'userId' = self.userId,
            'taskId' = self.taskId,
            'review' = self.review,
            'rating' = self.rating
        }
