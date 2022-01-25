import { useSelector, useDispatch } from 'react-redux'
import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { allTasks } from '../store/tasks';
import { allUsers } from '../store/session';
import './CSS/MainPage.css'

const MainPage = () => {
    const tasksObj = useSelector(state => state.tasks)
    const usersObj = useSelector(state => state.session)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allTasks())
    }, [dispatch])

    useEffect(() => {
        dispatch(allUsers())
    },[dispatch])

    const tasks = Object.values(tasksObj)
    const users = Object.values(usersObj)
    console.log("USERS:",users)
    const exercises = tasks.find((task) => task.category === 'Exercise')
    const trainings = tasks.find((task) => task.category === 'Training')
    const boardings = tasks.find((task) => task.category === 'Boarding')
    const miscs = tasks.find((task) => task.category === 'Misc')


    return (
        <div>
            <div className='category-links'>
                <p>{exercises?.category === 'Exercise'}</p>
                <NavLink to='/tasks/exercise'>
                    <img src={exercises?.pictures} className='category-img'></img>
                </NavLink>

                <p>{trainings?.category}</p>
                <NavLink to={`/tasks/training`}>
                    <img src={trainings?.pictures} className='category-img'></img>
                </NavLink>

                <p>{boardings?.category}</p>
                <NavLink to='/tasks/boarding'>
                    <img src={boardings?.pictures} className='category-img'></img>
                </NavLink>

                <p>{miscs?.category}</p>
                <NavLink to='/tasks/misc'>
                    <img src={miscs?.pictures} className='category-img'></img>
                </NavLink>
            </div>
            {/* <div>
                {users?.length > 0 &&
                users.map((user) => (
                    <div>
                        <NavLink to={`/user/${user.id}`}>
                            <img src={user.profilePic}></img>
                        </NavLink>
                    </div>
                ))}
            </div> */}
        </div>
    )
}

export default MainPage
