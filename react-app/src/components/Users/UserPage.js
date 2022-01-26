import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { allUsers } from "../../store/users";
import { allTasks } from "../../store/tasks";
import { editTask } from "../../store/tasks";
import { removeTask } from "../../store/tasks";

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
                        <div>

                            <NavLink to={`/tasks/${task.id}`}>
                                <img src={task.pictures}></img>
                            </NavLink>
                            <button>Edit</button>
                            <button
                                 onClick={onSubmit}
                                 id={id}
                                 >
                                 Delete
                                </button>
                        </div>
                    ))}
                </div>
            )}


        </div>
    )
}

export default UserPage
