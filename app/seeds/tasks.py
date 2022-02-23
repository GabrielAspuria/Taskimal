from app.models.task import db, Task

def seed_tasks():
    walking_all = Task(
        userId=2,
        animal='Any',
        name='Walking',
        description='Will walk any animal, any size for the low low price of $20 per session! Each session is one hour long with leashes but not harnesses provided!',
        price=20,
        category='Exercise',
        pictures='https://res.cloudinary.com/gabrielaspuria/image/upload/v1642791299/Taskimal/chicken_walking_nu6rmi.jpg'
    )
    crate_training_all = Task(
        userId=2,
        animal='Any',
        name='Crate Training',
        description='Will train any animal, any size to stay in and love being in their crate! Each session is 40 an hour with treats provided!',
        price=40,
        category='Training',
        pictures='https://res.cloudinary.com/gabrielaspuria/image/upload/v1642791348/Taskimal/alligator_crate_fvtol0.jpg'
    )

    boarding_camels = Task(
        userId=2,
        animal='Camel',
        name='Housing',
        description='Love camels. Drop them off here when you need to rest up and get away from the burning sun.',
        price=40,
        category='Boarding',
        pictures='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643412707/Taskimal/camel_pa8cul.jpg'
    )

    boarding_cats = Task(
        userId=2,
        animal='Cat',
        name='Housing',
        description='Need a getaway but have a cat(s)? Mi casa is your cat(s) casa! Food, water, bed, and kitty litter provided.',
        price=20,
        category='Boarding',
        pictures='https://res.cloudinary.com/gabrielaspuria/image/upload/v1642789054/Taskimal/cat_boarding_hpuool.png'
    )

    hippo_teeth_cleaning = Task(
        userId=2,
        animal='Hippo',
        name='Teeth Cleaning',
        description='Hippos are scary and brushing their teeth is dangerous. But I will do it and do it well.',
        price=100,
        category='Misc',
        pictures='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643168612/Taskimal/hippo_brush_gttqka.jpg'
    )

    puppy_playdate = Task(
        userId=3,
        animal='Dog',
        name='Playdate',
        description='I just got a new puppy and willing to watch over your puppies/dogs to get him socialized! Only $1 per hour with food/water/toys provided!',
        price=1,
        category='Misc',
        pictures='https://res.cloudinary.com/gabrielaspuria/image/upload/v1642789053/Taskimal/Puppy_playdate_zzsynf.png'
    )

    bird_running = Task(
        userId=1,
        animal='Bird',
        name='Running',
        description='Looking for friends to run with my bird and me! $1 a session because I just need birds to help my bird not feel alone when we run!',
        price=1,
        category='Exercise',
        pictures='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643045580/Taskimal/bird_running_g4wivi.png'
    )

    puppy_fetch = Task(
        userId=2,
        animal='Dog',
        name='Fetch',
        description='Fetch and puppy is an iconic duo and I will teach your little puppy how to play fetch and do it right!',
        price=20,
        category='Training',
        pictures='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643061208/Taskimal/German-Shepherd-Puppy-Fetch_uwpglz.jpg'
    )


    db.session.add(walking_all)
    db.session.add(crate_training_all)
    db.session.add(boarding_camels)
    db.session.add(boarding_cats)
    db.session.add(hippo_teeth_cleaning)
    db.session.add(puppy_playdate)
    db.session.add(bird_running)
    db.session.add(puppy_fetch)
    db.session.commit()

def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
