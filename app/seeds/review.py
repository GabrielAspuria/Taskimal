from app.models.review import db, Review

def seed_reviews():
    demo_review_one = Review(
        userId=1,
        taskId=1,
        rating=5,
        review='Fantastic walker!'
    )

    db.session.add(demo_review_one)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
