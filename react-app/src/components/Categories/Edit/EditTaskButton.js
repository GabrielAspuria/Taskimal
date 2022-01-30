import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { editTask, removeTask } from '../../../store/tasks'
import '../../CSS/TaskDetail.css'

const EditTaskButton = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([])
    const [editAnimal, setAnimal] = useState(props.task.animal)
    const [editName, setName] = useState(props.task.name)
    const [editDescription, setDescription] = useState(props.task.description)
    const [editPrice, setPrice] = useState(props.task.price)
    const [editPictures, setPictures] = useState(props.task.pictures)
    const { id } = useParams();

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(removeTask(id))
        history.push('/')
    }


    const handleEdit = async (e) => {
        e.preventDefault()

        const validationErrors = []
        const priceRegex = /^[0-9]+(\.[0-9][0-9])?$/;
        const imgRegex = /(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)/;
        if (!editName) validationErrors.push('Please provide a name for this task')
        if (!priceRegex.test(editPrice) && editPrice) validationErrors.push('Please provide a numeric price')
        if (!editPrice) validationErrors.push('Please provide a price per session')
        if (!imgRegex.test(editPictures) && editPictures) validationErrors.push('Please enter a valid image URL for your product')
        if (!editPictures) validationErrors.push('Please provide a picture representing your task')
        if (!editDescription) validationErrors.push('Please describe your task')
        setErrors(validationErrors)

        const editedTask = {
            animal: editAnimal,
            name: props.task.name,
            category: props.task.category,
            description: editDescription,
            price: editPrice,
            pictures: editPictures,
        }
        await dispatch(editTask(editedTask, props.task?.id))
    }

    return (
        <form onSubmit={handleEdit} className='edit-task-form'>
            <h2> Edit Task </h2>
            <div>
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
                {/* <select
                value={editAnimal}
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
                            value={editAnimal}
                            onChange={e => setAnimal(e.target.value)}
                        ></input>
            </div>

            </div>

            <div className='add-task-input'>
                <div>
                    <div><label> Name </label></div>
                    <input
                        type='text'
                        value={editName}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
            </div>

            <div className='add-task-input'>
                <div><label> Price: </label></div>
                <input
                    type='text'
                    value={editPrice}
                    onChange={e => setPrice(e.target.value)}
                />
            </div>

            <div className='add-task-input'>
                <div><label> Picture </label></div>
                <input
                    type='text'
                    value={editPictures}
                    onChange={e => setPictures(e.target.value)}
                />
            </div>

            <div className='add-task-input'>
                <div><label> Description </label></div>
                <textarea
                    type='text'
                    value={editDescription}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
                <div className='edit-buttons'>
                <button
                    className='delete-task-button'
                    onClick={handleDelete}
                    id={id}
                    >
                    Delete
                </button>
                <button className='submit-edit-button'>Submit</button>
                </div>
        </form>
    )
}

export default EditTaskButton
