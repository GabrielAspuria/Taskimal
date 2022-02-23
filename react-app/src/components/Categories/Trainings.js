import { useSelector, useDispatch } from 'react-redux'
import React, {useState, useEffect} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { allTasks, createTask } from '../../store/tasks';
import '../CSS/Category.css'

const Trainings = () => {
    const tasksObj = useSelector(state => state.tasks)
    const dispatch = useDispatch();
    const signedInUser = useSelector(state => state.session.user)
    const history = useHistory()

    const [errors, setErrors] = useState([])
    const [animal, setAnimal] = useState('')
    const [name,setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('Training')
    const [pictures, setPictures] = useState('')


    useEffect(() => {
        dispatch(allTasks())
    }, [dispatch])

    const resetForm = () => {
        setAnimal('')
        setName('')
        setDescription('')
        setPrice('')
        setCategory('Training')
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
        if (!imgRegex.test(pictures) && pictures) validationErrors.push('Please enter a valid image URL for your task')
        if (!pictures) validationErrors.push('Please provide a picture representing your task')
        if (!description) validationErrors.push('Please describe your task')
        setErrors(validationErrors)

        if (validationErrors.length === 0) {
            const newTraining = {
                animal,
                name,
                description,
                price,
                category,
                pictures,
                userId: signedInUser.id
            }
            await dispatch(createTask(newTraining))
            resetForm()
            history.push(`/user/${signedInUser.id}`)
        }
    }


    const tasks = Object.values(tasksObj)
    const trainings = tasks.filter((task) => task.category === 'Training')

    return (
        <div className='category-container'>
            {trainings.map((training) => (
                <div className='task'>
                    <div>
                        <NavLink to={`/tasks/${training?.id}`}>
                            <img src={training.pictures} className='pictures'/>
                        </NavLink>
                        <h3>{training?.animal} {training?.name} ${training?.price}</h3>
                    </div>

                </div>
            ))}
            {signedInUser !== null &&
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
                        <div>
                            <div><label> Animal </label></div>
                            {/* <select
                                value={animal}
                                onChange={(e) => setAnimal(e.target.value)}
                            >
                                <option value='Any'> Any </option>
                                <option value='Dog'> Dog </option>
                                <option value='Cat'> Cat </option>
                                <option value='Bird'> Bird </option>
                                <option value='Reptile'> Reptile </option>
                                <option value='Misc'> Misc </option>
                            </select> */}
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
                                placeholder='Price'
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
                                placeholder='JPG, PNG, or GIF URL'
                                type='text'
                                value={pictures}
                                onChange={e => setPictures(e.target.value)}
                            />
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
        </div>
    )
}

export default Trainings
