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
    const exercises = tasks.find((task) => task.category === 'Exercise')
    const trainings = tasks.find((task) => task.category === 'Training')
    const boardings = tasks.find((task) => task.category === 'Boarding')
    const miscs = tasks.find((task) => task.category === 'Misc')


    return (
        <div>
            <div>
                {exercises?.category}
                <NavLink to='/tasks/Exercise'>
                    <img src={exercises?.pictures}></img>
                </NavLink>
            </div>
            <div>
                <p>{trainings?.category}</p>
                <NavLink to='/tasks/Training'>
                    <img src={trainings?.pictures}></img>
                </NavLink>
            </div>
            <div>
                <p>{boardings?.category}</p>
                <NavLink to='/tasks/Boarding'>
                    <img src={boardings?.pictures}></img>
                </NavLink>
            </div>
            <div>
                <p>{miscs?.category}</p>
                <NavLink to='/tasks/Misc'>
                    <img src={miscs?.pictures}></img>
                </NavLink>
            </div>
        </div>
    )
}

export default MainPage
