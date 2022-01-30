import { useSelector, useDispatch } from 'react-redux'
import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { allTasks, createTask } from '../../store/tasks';
import '../CSS/Category.css'

const Miscs = () => {
    const tasksObj = useSelector(state => state.tasks)
    const dispatch = useDispatch();
    const signedInUser = useSelector(state => state.session.user)

    const [errors, setErrors] = useState([])
    const [animal, setAnimal] = useState('')
    const [name,setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('Misc')
    const [pictures, setPictures] = useState('')


    useEffect(() => {
        dispatch(allTasks())
    }, [dispatch])

    const resetForm = () => {
        setAnimal('')
        setName('')
        setDescription('')
        setPrice('')
        setCategory('Misc')
        setPictures('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = []
        const priceRegex = /^[0-9]+(\.[0-9][0-9])?$/;
        const imgRegex = /(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)/;
        if (!name) validationErrors.push('Please provide a name for this task')
        if (!priceRegex.test(price)) validationErrors.push('Please provide a numeric price')
        if (!price) validationErrors.push('Please provide a price per session')
        if (!imgRegex.test(pictures) && pictures) validationErrors.push('Please enter a valid image URL for your product')
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
        }
    }


    const tasks = Object.values(tasksObj)
    const miscs = tasks.filter((task) => task.category === 'Misc')

    return (
        <div className='category-container'>
            {miscs.map((misc) => (
                <div className='task'>
                    <div>
                        <NavLink to={`/tasks/${misc?.id}`}>
                            <img src={misc.pictures} className='pictures' />
                        </NavLink>
                    </div>
                    <h3>{misc?.animal} {misc?.name} ${misc?.price}</h3>
                </div>
            ))}
            <div>

            </div>
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
                    <div>
                        <div className='add-task-input'>
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
                            />
                        </div>
                    </div>

                    <div className='add-task-input'>
                        <div>
                            <div><label> Price </label></div>
                            <input
                                placeholder='Price'
                                type='text'
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='add-task-input'>
                        <div>
                            <div><label> Upload Image </label></div>
                            <input
                                placeholder='Image URL'
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
                                placeholder='Description of your task'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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

export default Miscs
