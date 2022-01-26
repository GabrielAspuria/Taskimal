import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { allTasks } from '../../../store/tasks'
import { allUsers } from '../../../store/users'
import '../../CSS/TaskDetail.css'

const TaskDetail = ({users}) => {
    const tasksObj = useSelector(state => state.tasks)
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const usersObj = useSelector(state => state.users)
    console.log(usersObj)
    const { id } = useParams();
    // const [name, setName] = useState('')

    useEffect(() => {
        dispatch(allTasks())
    }, [dispatch])

    useEffect(() => {
        dispatch(allUsers())
    }, [dispatch])

    const task = tasksObj[id]
    const user = Object.values(usersObj)
    console.log("USER",user)


    return (
        <div>
            <div>
                {}
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
