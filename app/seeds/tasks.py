from app.models.task import db, Task

def seed_tasks():
    walking_all = Task(
        userId=1,
        name='Animal Walking',
        description='Will walk any animal, any size for the low low price of $20 per session! Each session is one hour long with leashes but not harnesses provided!',
        price=20,
        category='Exercise',
        pictures='https://res.cloudinary.com/gabrielaspuria/image/upload/v1642791299/Taskimal/chicken_walking_nu6rmi.jpg'
    )
    crate_training_all = Task(
        userId=1,
        name='Animal Crate Training',
        description='Will train any animal, any size to stay in and love being in their crate! Each session is 40 an hour with treats provided!',
        price=40,
        category='Training',
        pictures='https://res.cloudinary.com/gabrielaspuria/image/upload/v1642791348/Taskimal/alligator_crate_fvtol0.jpg'
    )
    boarding_cats = Task(
        userId=2,
        name='Housing Cats',
        description='Need a getaway but have a cat(s)? Mi casa is your cat(s) casa! Food, water, bed, and kitty litter provided.',
        price=20,
        category='Boarding',
        pictures='https://res.cloudinary.com/gabrielaspuria/image/upload/v1642789054/Taskimal/cat_boarding_hpuool.png'
    )

    puppy_playdate = Task(
        userId=3,
        name='Puppy playdates',
        description='I just got a new puppy and willing to watch over your puppies/dogs to get him socialized! Only $1 per hour with food/water/toys provided!',
        price=1,
        category='Misc',
        pictures='https://res.cloudinary.com/gabrielaspuria/image/upload/v1642789053/Taskimal/Puppy_playdate_zzsynf.png'
    )

    bird_running = Task(
        userId=1,
        name='Bird Running',
        description='Looking for friends to run with my bird and me! $1 a session because I just need birds to help my bird not feel alone when we run!',
        price=1,
        category='Exercise',
        pictures='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643045580/Taskimal/bird_running_g4wivi.png'
    )


    db.session.add(walking_all)
    db.session.add(crate_training_all)
    db.session.add(boarding_cats)
    db.session.add(puppy_playdate)
    db.session.add(bird_running)
    db.session.commit()

def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
