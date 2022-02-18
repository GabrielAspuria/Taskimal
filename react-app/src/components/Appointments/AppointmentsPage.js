import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { allAppointments, cancelAppointment } from "../../store/appointments";
import { allTasks } from "../../store/tasks";
import '../CSS/AppointmentsPage.css'


const AppointmentsPage = () => {
    const appsObj = useSelector(state => state.appointments)
    const tasksObj = useSelector(state => state.tasks)
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory()
    const apps = Object.values(appsObj);
    apps.forEach((app) => {
        app.task = tasksObj[app?.taskId];
    });
    const date = Date()
    const month = date.split(' ')[1]
    const today = date.split(' ')[2]

    useEffect(() => {
        dispatch(allAppointments())
    }, [dispatch])

    useEffect(() => {
        dispatch(allTasks())
    }, [dispatch])

    const handleDelete = async (e) => {
        e.preventDefault()
        const confirmed = window.confirm('Cancel appointment?')
        if(confirmed) await dispatch(cancelAppointment(e.target.id))
        // await dispatch(cancelAppointment(e.target.id))
    }

    const userApps = apps.filter((app) => app?.userId === sessionUser?.id)

    return (
        <div>
            <h1 className="title"> Appointments </h1>
            <div className="app-box">
                {userApps?.map((app) => (
                    <div className="app-container">
                        <NavLink to={`/tasks/${app?.taskId}`}>
                            <img src={app?.task?.pictures} className="app-img"/>
                        </NavLink>
                        <div className="app-info">
                            <div>{app?.task?.name}</div>
                            <div> Payment: ${app?.task?.price}</div>
                            <div>Date: {app?.month} {app?.day}, {app?.year}</div>
                            <div>Time: {app.time} {app.ap} </div>
                        <button
                            onClick={handleDelete}
                            id={app.id}
                            className="delete"
                            >
                            Cancel Appointment
                        </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AppointmentsPage
