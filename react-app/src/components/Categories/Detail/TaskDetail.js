import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { allTasks } from '../../../store/tasks'
import { allUsers } from '../../../store/users'
import { removeTask } from '../../../store/tasks'
import { cancelAppointment } from '../../../store/appointments'
import EditTaskButton from '../Edit/EditTaskButton'
import BookAppointmentButton from '../../Appointments/BookAppointmentButton'
import '../../CSS/TaskDetail.css'

const TaskDetail = () => {
    const dispatch = useDispatch()
    const tasksObj = useSelector(state => state.tasks)
    const usersObj = useSelector(state => state.users.users)
    const sessionUser = useSelector(state => state.session.user)
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
    const users = Object.values(usersObj)
    const creator = users.filter((user) => user?.id === task?.userId)

    return (
        <div>
            <div>
                {/* <img src={creator[0]?.profilePic} className='profile-pic'/> */}
                <img src={task?.pictures} className='task-img'></img>
            </div>
            <div>
                <h2> {task?.animal} {task?.name}</h2>
                <h2> Price: ${task?.price} </h2>
                <p> Tasker: {creator[0]?.firstname} {creator[0]?.lastname} </p>
                <p> Description: {task?.description} </p>
                {/* <p> Animal: {task?.animal} </p> */}
            </div>
            <div>
                {sessionUser && sessionUser?.id !== creator[0]?.id && (
                    <BookAppointmentButton
                    task={task}
                    ></BookAppointmentButton>
                    )}
            </div>
            <div>
                {/* {sessionUser && (
                    )} */}
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
