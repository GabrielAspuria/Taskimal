from app.models.appointment import db, Appointment

def seed_appointments():
    cat_boarding_appointment = Appointment(
        userId=1,
        taskId=4,
        year=2022,
        month='Jan',
        day='29',
        time=12,
        ap='PM'
    )

    puppy_playdate_appointment = Appointment(
        userId=1,
        taskId=6,
        year=2022,
        month='Jan',
        day='30',
        time=10,
        ap='AM'
    )

    db.session.add(cat_boarding_appointment)
    db.session.add(puppy_playdate_appointment)
    db.session.commit()

def undo_appointments():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
