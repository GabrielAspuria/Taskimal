import { useSelector, useDispatch } from 'react-redux'
import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { allTasks } from '../store/tasks';

const MainPage = () => {
    const tasksObj = useSelector(state => state.tasks)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allTasks())
    }, [dispatch])

    const tasks = Object.values(tasksObj)

    return (
        <div>
            {tasks?.length > 0 && (
                tasks.map((task) => (
                    <div>
                        <p> {task.name} </p>
                        <img src={task?.pictures} />
                    </div>
                )
            ))}
        </div>
    )
}

export default MainPage
