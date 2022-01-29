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
            <div className='header-background'>
                <img src='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643416678/Taskimal/background_omaeag.png' className='background-img'></img>
                    <h2 className='header'> From your chicken's morning walks, to brushing your hippo's teeth, book an appointment for that task today! </h2>
                <div className='header-container'>
                </div>
            </div>
            <h1 className='title'> Task Categories</h1>
            <div className='category-links'>
                <div className='category'>
                    <NavLink to='/tasks/exercise'>
                        <img src={exercises?.pictures} className='category-img'></img>
                    </NavLink>
                        <div className='category-name'> Exercise </div>
                </div>

                <div className='category'>
                    <NavLink to={`/tasks/training`}>
                        <img src={trainings?.pictures} className='category-img'></img>
                    </NavLink>
                    <div className='category-name'>Training</div>
                </div>

                <div className='category'>
                    <NavLink to='/tasks/boarding'>
                        <img src={boardings?.pictures} className='category-img'></img>
                    </NavLink>
                    <div className='category-name'>Boarding</div>
                </div>

                <div className='category'>
                    <NavLink to='/tasks/misc'>
                        <img src={miscs?.pictures} className='category-img'></img>
                    </NavLink>
                    <div className='category-name'>Misc</div>
                </div>
            </div>
        </div>
    )
}

export default MainPage
