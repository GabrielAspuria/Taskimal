import { useSelector, useDispatch } from 'react-redux'
import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { allTasks, createTask } from '../../store/tasks';
import '../CSS/Category.css'

const Exercises = () => {
    const tasksObj = useSelector(state => state.tasks)
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)

    const [animal, setAnimal] = useState('Any')
    const [name,setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('Exercise')
    const [pictures, setPictures] = useState('')


    useEffect(() => {
        dispatch(allTasks())
    }, [dispatch])

    const resetForm = () => {
        setAnimal('Any')
        setName('')
        setDescription('')
        setPrice('')
        setCategory('Exercise')
        setPictures('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newExercise = {
            animal,
            name,
            description,
            price,
            category,
            pictures,
            userId: sessionUser.id
        }
        await dispatch(createTask(newExercise))
        resetForm()
    }

    const tasks = Object.values(tasksObj)
    const exercises = tasks.filter((task) => task?.category === 'Exercise')

    return (
        <div>
            {exercises.map((exercise) => (
                <div>
                    {exercise?.animal} {exercise?.name} ${exercise?.price}
                    <div>
                        <NavLink to={`/tasks/${exercise?.id}`}>
                            <img src={exercise.pictures} className='pictures' />
                        </NavLink>
                    </div>

                </div>
            ))}
            {sessionUser !== null &&
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

export default Exercises
