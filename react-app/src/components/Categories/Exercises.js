import { useSelector, useDispatch } from 'react-redux'
import React, {useState, useEffect} from 'react';
import { NavLink,useHistory } from 'react-router-dom';
import { allTasks, createTask } from '../../store/tasks';
import '../CSS/Category.css'

const Exercises = () => {
    const tasksObj = useSelector(state => state.tasks)
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    // const uploadedFile = useSelector((state) => state.tasks)
    const history = useHistory()
    // console.log("YEEEEEET",uploadedFile)

    const [errors, setErrors] = useState([])
    const [animal, setAnimal] = useState('')
    const [name,setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('Exercise')
    const [pictures, setPictures] = useState('')
    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)
    const [file, setFile] = useState()

    useEffect(() => {
        dispatch(allTasks())
    }, [dispatch])

    const resetForm = () => {
        setAnimal('')
        setName('')
        setDescription('')
        setPrice('')
        setCategory('Exercise')
        setPictures('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = []
        // const priceRegex = /^[0-9]+(\.[0-9][0-9])?$/;
        const imgRegex = /(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)/;
        if (!animal) validationErrors.push('Please specify what type of animal(s) this task is for')
        if (!name) validationErrors.push('Please provide a name for this task')
        // if (!priceRegex.test(price)) validationErrors.push('Please provide a numeric price')
        if (price && (price <= 0 || price > 100)) validationErrors.push('Please provide a price between $1 and $100')
        if (!price) validationErrors.push('Please provide a price per session')
        // if (!imgRegex.test(pictures) && pictures) validationErrors.push('Please enter a valid image URL for your task')
        // if (!pictures) validationErrors.push('Please provide a picture representing your task')
        if (!description) validationErrors.push('Please describe your task')
        setErrors(validationErrors)

        if (validationErrors.length === 0) {
            // const newTraining = {
            //     animal,
            //     name,
            //     description,
            //     price,
            //     category,
            //     pictures,
            //     userId: sessionUser.id
            // }
            const userId = sessionUser.id

            let formData = new FormData();
            // formData.append('image', image)
            formData.append('file', file)
            formData.set('animal', animal)
            formData.set('userId', userId)
            formData.set('name', name)
            formData.set('description', description)
            formData.set('price', price)
            formData.set('category', category)
            formData.set('pictures', image)
            // console.log(formData)

            setImageLoading(true);

            const res = await fetch(`/api/tasks/`, {
                method: 'POST',
                body: formData,
            });

            console.log(res)

            if (res.ok) {
                await res.json()
                setImageLoading(false)
                resetForm()
                history.push(`/user/${sessionUser.id}`)
                await dispatch(createTask(formData))
            } else {
                console.log("error")
            }
            // await dispatch(createTask(newTraining))
            // resetForm()
            // history.push(`/user/${sessionUser.id}`)
        }
    }

    const tasks = Object.values(tasksObj)
    const exercises = tasks.filter((task) => task?.category === 'Exercise')

    const updateImage = (e) => {
        const file = e.target.files[0]
        setFile(file)
    }
    return (
        <div className='category-container'>
            {exercises.map((exercise) => (
                <div className='task'>
                    <div>
                        <NavLink to={`/tasks/${exercise?.id}`}>
                            <img src={exercise.pictures} className='pictures' />
                        </NavLink>
                        <h3>{exercise?.animal} {exercise?.name} ${exercise?.price}</h3>
                    </div>

                </div>
            ))}
            {sessionUser !== null &&
                <form onSubmit={handleSubmit} className='add-task-form'>
                    <h2> Add A Task </h2>
                    <div>
                        <ul>
                            {errors.length > 0 &&
                            errors.map(error => (
                                <li key={error}> {error} </li>
                            ))}
                        </ul>
                    </div>
                    <div className='add-task-input'>
                        <div><label> Animal </label></div>
                        <div>
                            <input
                                placeholder='What kind of animal(s)?'
                                type='text'
                                value={animal}
                                onChange={e => setAnimal(e.target.value)}
                                maxLength='50'
                            >
                            </input>
                        </div>
                    </div>

                    <div className='add-task-input'>
                        <div>
                            <div><label> Name </label></div>
                            <input
                                placeholder='Name of your task'
                                type='text'
                                value={name}
                                onChange={e => setName(e.target.value)}
                                maxLength='50'
                            />
                        </div>
                    </div>

                    <div className='add-task-input'>
                        <div>
                            <div><label> Price </label></div>
                            <input
                                placeholder='Price($1 - $100)'
                                type='number'
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                maxLength='3'
                            />
                        </div>
                    </div>

                    <div className='add-task-input'>
                        <div>
                            <div><label> Upload Image </label></div>
                            <input
                                // placeholder='JPG, PNG, or GIF URL'
                                // type='text'
                                // value={pictures}
                                // onChange={e => setPictures(e.target.value)}
                                type='file'
                                onChange={updateImage}
                            />
                            {(imageLoading) && <p> Loading...</p>}
                        </div>
                    </div>

                    <div className='add-task-input'>
                        <div>
                            <div><label> Description </label></div>
                            <textarea
                                placeholder='Description of your task(max: 500)'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                maxLength='500'
                            />
                        </div>
                    </div>
                    <button className='add-task-button'>
                        Submit
                    </button>
                </form>
            }
            {/* {createTask && <img src={uploadedFile.pictures} alt={uploadedFile.userid} />} */}
        </div>
    )
}

export default Exercises
