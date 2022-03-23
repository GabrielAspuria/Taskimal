from app.models.review import db, Review

def seed_reviews():
    demo_review_one = Review(
        userId=1,
        taskId=1,
        rating=5,
        review='Fantastic walker!'
    )

    demo_review_two = Review(
        userId=3,
        taskId=1,
        rating=5,
        review='Always go to Marnie for walks!'
    )

    demo_review_three = Review(
        userId=1,
        taskId=2,
        rating=5,
        review='Fantastic crate trainer!'
    )

    db.session.add(demo_review_one)
    db.session.add(demo_review_two)
    db.session.add(demo_review_three)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
