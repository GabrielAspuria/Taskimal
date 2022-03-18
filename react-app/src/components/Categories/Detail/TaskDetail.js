import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory, NavLink } from 'react-router-dom'
import { allTasks } from '../../../store/tasks'
import { allUsers } from '../../../store/users'
import { allAppointments, cancelAppointment } from '../../../store/appointments'
import { removeTask } from '../../../store/tasks'
import EditTaskButton from '../Edit/EditTaskButton'
import BookAppointmentButton from '../../Appointments/BookAppointmentButton'
import '../../CSS/TaskDetail.css'
import Reviews from '../../Reviews/Review'

const TaskDetail = () => {
    const dispatch = useDispatch()
    const tasksObj = useSelector(state => state.tasks)
    const usersObj = useSelector(state => state.users.users)
    const appoinmentsObj = useSelector(state => state.appointments)
    const sessionUser = useSelector(state => state.session.user)
    const { id } = useParams();
    const history = useHistory()

    useEffect(() => {
        dispatch(allTasks())
    }, [dispatch])

    useEffect(() => {
        dispatch(allUsers())
    }, [dispatch])

    useEffect(() => {
        dispatch(allAppointments())
    },[dispatch])

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(removeTask(id))
        await dispatch(cancelAppointment(id))
        history.push('/')
    }

    const task = tasksObj[id]
    const users = Object.values(usersObj)
    const creator = users.filter((user) => user?.id === task?.userId)

    return (
        <div className='task-detail'>
            <div> <img src={creator[0]?.profilePic} className='profile-pic'/></div>
            <div>
                <img src={task?.pictures} className='task-img'></img>
            </div>
            <div className='task-info-container'>
                <p> {task?.animal} {task?.name}</p>
                <p> Price: ${task?.price} </p>
                <p> Tasker: {creator[0]?.firstname} {creator[0]?.lastname} </p>
                <p> Description: {task?.description} </p>
            </div>
            <div id='not-logged'>
                {!sessionUser && (
                    <p id='not-logged'> <NavLink to='/login'>Login to book an appointment!</NavLink></p>
                )}
            </div>
            <div>
                {sessionUser && sessionUser?.id !== creator[0]?.id && (
                    <BookAppointmentButton
                    task={task}
                    ></BookAppointmentButton>
                    )}
            </div>
            <div className='edit-task-button'>
                {sessionUser?.id === creator[0]?.id && (
                    <p className='edit-delete-buttons'>
                        <EditTaskButton
                        task={task}
                        ></EditTaskButton>
                    </p>
                )}
            </div>
            <Reviews task={task}/>
        </div>
    )

}

export default TaskDetail
