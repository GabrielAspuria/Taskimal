import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { allUsers } from "../../store/users";
import { allTasks } from "../../store/tasks";

const UserPage = () => {
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
    const userTasks = tasks.filter((task) => task.userId === user.id)
    console.log(userTasks)

    return (
        <div>
            {user?.profilePic === null && (
                <img src='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643131788/Taskimal/paw_goc9fo.png'></img>
            )}
            {user?.profilePic && (
                <img src={user.profilePic}/>
            )}
            {user?.id && (
                <div>
                    {userTasks?.length > 0 &&
                    userTasks.map((task) => (

                        <NavLink to={`/tasks/${task.id}`}>
                            <img src={task.pictures}></img>
                        </NavLink>
                    ))}
                </div>
            )}


        </div>
    )
}

export default UserPage
