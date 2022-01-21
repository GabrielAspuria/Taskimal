import { useSelector, useDispatch } from 'react-redux'
import React, {useEffect} from 'react';
// import { NavLink } from 'react-router-dom';
import { allTasks } from '../store/tasks';

const MainPage = () => {
    const tasksObj = useSelector(state => state.tasks)
    console.log("TASKS:", tasksObj)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(allTasks())
    }, [dispatch])

    const tasks = Object.values(tasksObj)

    return (
        <div>
        </div>
    )
}

export default MainPage
