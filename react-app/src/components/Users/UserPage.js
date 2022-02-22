import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { allUsers } from "../../store/users";
import { allTasks } from "../../store/tasks";
import '../CSS/UserPage.css'

const UserPage = ({id}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const tasksObj = useSelector(state => state.tasks)

    useEffect(() => {
        dispatch(allUsers())
    }, [dispatch])

    useEffect(() => {
        dispatch(allTasks())
    }, [dispatch])

    const tasks = Object.values(tasksObj)
    const userTasks = tasks.filter((task) => task?.userId === user?.id)

    return (
        <div>
            <div className="user-info">
                {user?.profilePic === null && (
                    <img src='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643131788/Taskimal/paw_goc9fo.png' className="profile-pic"></img>
                )}
                {user?.profilePic && (
                    <img src={user.profilePic} className="profile-pic"/>
                )}
                {user?.profilePic === null && (
                    <img src='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643131788/Taskimal/paw_goc9fo.png' className="profile-pic"></img>
                )}
                <div className="carousel">
                    {user?.profilePic && (
                        <img src={user.profilePic} className="profile-pic"/>
                    )}
                </div>
                <div className="bio">
                    <h2 className="bio-header"> Bio </h2>
                    <div className="bio-info">
                        Name: {user?.firstname} {user?.lastname}
                    </div>
                    <div className="bio-info">
                        Specialty: All animals
                    </div>
                    <div className="bio-info"> Tasker: Yes </div>
                </div>
                <div className="contact">
                    <h2 className="bio-header">  Contact Info </h2>
                    <div className="bio-info"> Email: {user?.email} </div>
                    <div className="bio-info"> Phone: (123)456-7890</div>
                </div>
            </div>
            <h1 className="title"> Your Tasks </h1>
            {user?.id && (
                <div className="your-task-links">
                    {userTasks?.length > 0 &&
                    userTasks.map((task) => (
                        <div>
                            <div className="your-task"> {task.animal}: {task.name} </div>
                            <NavLink to={`/tasks/${task.id}`}>
                                <img src={task.pictures} className="category"></img>
                            </NavLink>
                        </div>
                    ))}
                </div>
            )}


        </div>
    )
}

export default UserPage
