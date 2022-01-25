import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { allTasks } from '../../../store/tasks'
import '../../CSS/TaskDetail.css'

const TaskDetail = () => {
    const tasksObj = useSelector(state => state.tasks)
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const { id } = useParams();
    // const [name, setName] = useState('')

    useEffect(() => {
        dispatch(allTasks())
    }, [dispatch])

    const task = tasksObj[id]


    return (
        <div>
            <div>
                <img src='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643130440/Taskimal/vaccination_mixxfz.png' className='profile-pic' />
                <img src={task?.pictures} className='task-img'></img>
            </div>
            <div>
                <h1> {task?.name}</h1>
                <h2> ${task?.price} </h2>
                <p> Description: {task?.description} </p>
                <p> Animal: {task?.animal} </p>
            </div>
            <div>

            </div>
        </div>
    )

}

export default TaskDetail
