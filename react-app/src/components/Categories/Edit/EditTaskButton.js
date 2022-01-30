import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editTask } from '../../../store/tasks'

const EditTaskButton = (props) => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [editAnimal, setAnimal] = useState(props.task.animal)
    const [editName, setName] = useState(props.task.name)
    const [editDescription, setDescription] = useState(props.task.description)
    const [editPrice, setPrice] = useState(props.task.price)
    const [editPictures, setPictures] = useState(props.task.pictures)

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
        <form onSubmit={handleEdit}>
            <div>
                <div>
                    <ul>
                        {errors.length > 0 &&
                        errors.map(error => (
                            <li key={error}> {error} </li>
                        ))}
                    </ul>
                </div>
                <div>
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

            <div>
                <div>
                    <div><label> Name </label></div>
                    <input
                        type='text'
                        value={editName}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <div><label> Price: </label></div>
                <input
                    type='text'
                    value={editPrice}
                    onChange={e => setPrice(e.target.value)}
                />
            </div>

            <div>
                <div><label> Picture </label></div>
                <input
                    type='text'
                    value={editPictures}
                    onChange={e => setPictures(e.target.value)}
                />
            </div>

            <div>
                <div><label> Description </label></div>
                <textarea
                    type='text'
                    value={editDescription}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>

            <button>Submit</button>
        </form>
    )
}

export default EditTaskButton
