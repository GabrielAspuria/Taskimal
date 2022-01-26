import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { allTasks } from '../../../store/tasks'
import { allUsers } from '../../../store/users'
import { editTask } from '../../../store/tasks'
import { removeTask } from '../../../store/tasks'
import '../../CSS/TaskDetail.css'

const TaskDetail = ({animal, name, description, price, category, pictures}) => {
    const tasksObj = useSelector(state => state.tasks)
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const usersObj = useSelector(state => state.users.users)
    const { id } = useParams();
    const history = useHistory()
    const [editAnimal, setAnimal] = useState(animal?.animal)
    const [editDescription, setDescription] = useState(description?.description)
    const [editPrice, setPrice] = useState(price)
    const [editCategory, setCategory] = useState(category?.category)
    const [editPictures, setPictures] = useState(pictures?.pictures)

    useEffect(() => {
        dispatch(allTasks())
    }, [dispatch])

    useEffect(() => {
        dispatch(allUsers())
    }, [dispatch])

    const handleEdit = async (e) => {
        e.preventDefault()
        const editedTask = {
            animal: editAnimal,
            description: editDescription,
            price: +editPrice,
            category: editCategory,
            pictures: editPictures,
            userId: sessionUser.id
        }
        await dispatch(editTask(editedTask, task?.id))
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(removeTask(id))
        history.push('/')
    }

    const task = tasksObj[id]
    console.log(task)
    const tasks = Object.values(tasksObj)

    return (
        <div>
            <div>
                {task?.profilePic === null && (
                    <img src='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643131788/Taskimal/paw_goc9fo.png' className='profile-pic' />
                )}
                {task?.profilePic && (
                    <img src={task?.profilePic}/>
                )}
                <img src={task?.pictures} className='task-img'></img>
            </div>
            <div>
                <h1> {task?.name}</h1>
                <h2> ${task?.price} </h2>
                <p> Description: {task?.description} </p>
                <p> Animal: {task?.animal} </p>
            </div>
            <div>
                <button onClick={{handleEdit}}>Edit</button>
                <button
                    onClick={handleDelete}
                    id={id}
                    >
                    Delete
                </button>
            </div>
        </div>
    )

}

export default TaskDetail
