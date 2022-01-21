from app.models.task import db, Task

def seed_tasks():
    walking = Task(
        userId=1,
        name='All animal size walking',
        description='Will walk any animal, any size for the low low price of $20 per session! Each session is one hour long!',
        price=20,
        category='Exercise',
        pictures='https://gyazo.com/d7241e732e9d8741660332a618643f8c'
    )

    db.session.add(walking)
    db.session.commit()

def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
