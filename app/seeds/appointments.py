from app.models.appointment import db, Appointment

def seed_appointments():
    camel_boarding_appointment = Appointment(
        userId=1,
        taskId=3,
        year=2022,
        month='Mar',
        day='29',
        time=12,
        ap='PM'
    )

    hippo_cleaning_appointment = Appointment(
        userId=1,
        taskId=5,
        year=2022,
        month='Mar',
        day='30',
        time=10,
        ap='AM'
    )

    db.session.add(camel_boarding_appointment)
    db.session.add(hippo_cleaning_appointment)
    db.session.commit()

def undo_appointments():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
