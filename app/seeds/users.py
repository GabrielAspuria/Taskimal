from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        firstname='Demo',
        lastname='User',
        email='demo@aa.io',
        profilePic='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643131788/Taskimal/paw_goc9fo.png',
        password='password')
    marnie = User(
        username='marnie',
        firstname='Marnie',
        lastname='Smith',
        email='marnie@aa.io',
        profilePic='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643131788/Taskimal/paw_goc9fo.png',
        password='password')
    bobbie = User(
        username='bobbie',
        firstname='Bobbie',
        lastname='Hill',
        email='bobbie@aa.io',
        profilePic='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643131788/Taskimal/paw_goc9fo.png',
        password='password')
    gabe = User(
        username='Gabe',
        firstname='Gabriel',
        lastname='Aspuria',
        email='gabriel@aa.io',
        profilePic='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643136013/Taskimal/me_amhhuh.jpg',
        password='password'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(gabe)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
