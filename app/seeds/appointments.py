from app.models.appointment import db, Appointment

def seed_appointments():
    cat_boarding_appointment = Appointment(
        userId=1,
        taskId=3,
        date='Feb 19 2022',
        time='12:00'
    )

    dog_playdate_appointment = Appointment(
        userId=1,
        taskId=4,
        date='Feb 20 2022',
        time=10:00
    )

    dog_playdate_two_appointment = Appointment(
        userId=1,
        taskId=4,
        date='Feb 21 2022',
        time='11:00'
    )

    db.session.add(cat_boarding_appointment)
    db.session.add(dog_playdate_appointment)
    db.session.add(dog_playdate_two_appointment)
    db.session.commit()

def undo_appointments():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
