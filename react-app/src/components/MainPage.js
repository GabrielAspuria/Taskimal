import { useSelector, useDispatch } from 'react-redux'
import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { allTasks } from '../store/tasks';
import { allUsers } from '../store/users';
import './CSS/MainPage.css'

const MainPage = () => {
    const tasksObj = useSelector(state => state.tasks)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allTasks())
    }, [dispatch])

    useEffect(() => {
        dispatch(allUsers())
    },[dispatch])

    const tasks = Object.values(tasksObj)
    const exercises = tasks.find((task) => task.category === 'Exercise')
    const trainings = tasks.find((task) => task.category === 'Training')
    const boardings = tasks.find((task) => task.category === 'Boarding')
    const miscs = tasks.find((task) => task.category === 'Misc')


    return (
        <div className='main'>
            <div>
                <h2> From your chicken's morning walks, to brushing your hippo's teeth, book an appointment for that task today! </h2>
            </div>
            <h1 className='title'> Task Categories</h1>
            <div className='category-links'>
                <div>
                    <div className='category'> Exercise </div>
                    <NavLink to='/tasks/exercise'>
                            <img src={exercises?.pictures} className='category-img'></img>
                    </NavLink>
                </div>

                <div>
                    <div className='category'>Training</div>
                    <NavLink to={`/tasks/training`}>
                        <img src={trainings?.pictures} className='category-img'></img>
                    </NavLink>
                </div>

                <div>
                    <div className='category'>Boarding</div>
                    <NavLink to='/tasks/boarding'>
                        <img src={boardings?.pictures} className='category-img'></img>
                    </NavLink>
                </div>

                <div>
                    <div className='category'>Misc</div>
                    <NavLink to='/tasks/misc'>
                        <img src={miscs?.pictures} className='category-img'></img>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default MainPage
