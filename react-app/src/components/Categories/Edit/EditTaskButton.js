import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editTask } from '../../../store/tasks'

const EditTaskButton = (props) => {
    const dispatch = useDispatch()
    const [editAnimal, setAnimal] = useState("")
    const [editName, setName] = useState("")
    const [editDescription, setDescription] = useState("")
    const [editPrice, setPrice] = useState("")
    const [editPictures, setPictures] = useState("")


    const handleEdit = async (e) => {
        e.preventDefault()
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
            <label> Animal: </label>
            <select
            value={editAnimal}
            onChange={(e) => setAnimal(e.target.value)}
            >
                <option value='Any'> Any </option>
                <option value='Dog'> Dog </option>
                <option value='Cat'> Cat </option>
                <option value='Bird'> Bird </option>
                <option value='Reptile'> Reptile </option>
                <option value='Misc'> Misc </option>
            </select>
            <label> Name: </label>
            <input
                type='text'
                value={editName}
                onChange={e => setName(e.target.value)}
            />
            <label> Description: </label>
            <textarea
                type='text'
                value={editDescription}
                onChange={e => setDescription(e.target.value)}
            />
            <label> Price: </label>
            <input
                type='text'
                value={editPrice}
                onChange={e => setPrice(e.target.value)}
            />
            <label> Pictures: </label>
            <input
                type='text'
                value={editPictures}
                onChange={e => setPictures(e.target.value)}
            />
            <button>Submit</button>
        </form>
    )
}

export default EditTaskButton
