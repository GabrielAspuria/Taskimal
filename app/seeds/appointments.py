from app.models.appointment import db, Appointment

def seed_appointments():
    pass
    
def undo_appointments():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
