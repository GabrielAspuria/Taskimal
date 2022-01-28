import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { allUsers } from "../../store/users";
import { allTasks, editTask, removeTask } from "../../store/tasks";
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

    const onSubmit = async (e) => {
        e.preventDefault()
        await dispatch(removeTask(id))
    }


    const tasks = Object.values(tasksObj)
    const userTasks = tasks.filter((task) => task?.userId === user?.id)

    return (
        <div>
            {user?.profilePic === null && (
                <img src='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643131788/Taskimal/paw_goc9fo.png' className="profile-pic"></img>
            )}
            {user?.profilePic && (
                <img src={user.profilePic} className="profile-pic"/>
            )}
            {user?.id && (
                <div>
                    {userTasks?.length > 0 &&
                    userTasks.map((task) => (
                        <div>

                            <NavLink to={`/tasks/${task.id}`}>
                                <img src={task.pictures} className="task-img"></img>
                            </NavLink>
                        </div>
                    ))}
                </div>
            )}


        </div>
    )
}

export default UserPage
