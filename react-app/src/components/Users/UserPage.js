import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { allUsers } from "../../store/session";
import { allTasks } from "../../store/tasks";

const UserPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const tasksObj = useSelector(state => state.tasks)
    const { id } = useParams()

    useEffect(() => {
        dispatch(allUsers())
    }, [dispatch])

    return (
        <div>
            {user?.profilePic === null && (
                <img src='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643131788/Taskimal/paw_goc9fo.png'></img>
            )}
            {user?.profilePic && (
                <img src={user.profilePic}/>
            )}
        </div>
    )
}

export default UserPage
