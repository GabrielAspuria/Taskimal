import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { allTasks } from '../../../store/tasks'
import { allUsers } from '../../../store/users'
import { removeTask } from '../../../store/tasks'
import EditTaskButton from '../Edit/EditTaskButton'
import BookAppointmentButton from '../../Appointments/BookAppointmentButton'
import '../../CSS/TaskDetail.css'

const TaskDetail = () => {
    const tasksObj = useSelector(state => state.tasks)
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const usersObj = useSelector(state => state.users.users)
    const { id } = useParams();
    const history = useHistory()

    useEffect(() => {
        dispatch(allTasks())
    }, [dispatch])

    useEffect(() => {
        dispatch(allUsers())
    }, [dispatch])

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(removeTask(id))
        history.push('/')
    }

    const task = tasksObj[id]
    const tasks = Object.values(tasksObj)
    const users = Object.values(usersObj)
    const creator = users.filter((user) => user?.id === task?.userId)

    return (
        <div>
            <div>
                <p> {creator[0]?.firstname} {creator[0]?.lastname} </p>
                <img src={creator[0]?.profilePic}/>
                <img src={task?.pictures} className='task-img'></img>
            </div>
            <div>
                <h1> {task?.name}</h1>
                <h2> ${task?.price} </h2>
                <p> Description: {task?.description} </p>
                <p> Animal: {task?.animal} </p>
            </div>
            <div>
                {sessionUser && sessionUser?.id !== creator[0]?.id && (
                    <BookAppointmentButton
                    task={task}
                    ></BookAppointmentButton>
                )}
            </div>
            <div>
                {sessionUser?.id === creator[0]?.id && (
                    <EditTaskButton
                    task={task}
                    ></EditTaskButton>
                )}
                {sessionUser?.id === creator[0]?.id && (
                    <button
                        onClick={handleDelete}
                        id={id}
                        >
                        Delete
                    </button>
                )}
            </div>
        </div>
    )

}

export default TaskDetail
