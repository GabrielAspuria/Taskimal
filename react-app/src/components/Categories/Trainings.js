import { useSelector, useDispatch } from 'react-redux'
import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { allTasks, createTask } from '../../store/tasks';
import '../CSS/Category.css'

const Trainings = () => {
    const tasksObj = useSelector(state => state.tasks)
    const dispatch = useDispatch();
    const signedInUser = useSelector(state => state.session.user)

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
        setAnimal('Any')
        setName('')
        setDescription('')
        setPrice('')
        setCategory('Training')
        setPictures('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
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


    const tasks = Object.values(tasksObj)
    const trainings = tasks.filter((task) => task.category === 'Training')

    return (
        <div>
            {trainings.map((training) => (
                <div>
                    {training?.animal} {training?.name} ${training?.price}
                    <div>
                        <NavLink to={`/tasks/${training?.id}`}>
                            <img src={training.pictures} className='pictures'/>
                        </NavLink>
                    </div>

                </div>
            ))}
            {signedInUser !== null &&
                <form onSubmit={handleSubmit}>
                    <div>
                    <label> Animal </label>
                        <select
                            value={animal}
                            onChange={(e) => setAnimal(e.target.value)}
                        >
                            <option value='Any'> Any </option>
                            <option value='Dog'> Dog </option>
                            <option value='Cat'> Cat </option>
                            <option value='Bird'> Bird </option>
                            <option value='Reptile'> Reptile </option>
                            <option value='Misc'> Misc </option>
                        </select>
                    </div>
                    <div>
                        <label> Name </label>
                        <input
                            placeholder='Name of your task'
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label> Description </label>
                        <textarea
                            placeholder='Description of your task'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label> Price </label>
                        <input
                            placeholder='Price'
                            type='text'
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <label> Upload Image </label>
                        <input
                            placeholder='Image URL'
                            type='text'
                            value={pictures}
                            onChange={e => setPictures(e.target.value)}
                        />
                    </div>
                    <button>
                        Submit
                    </button>
                </form>
            }
        </div>
    )
}

export default Trainings
