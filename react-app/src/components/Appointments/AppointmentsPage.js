import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { allAppointments, cancelAppointment } from "../../store/appointments";
import { allTasks } from "../../store/tasks";
import '../CSS/AppointmentsPage.css'


const AppointmentsPage = () => {
    const appsObj = useSelector(state => state.appointments)
    const tasksObj = useSelector(state => state.tasks)
    const dispatch = useDispatch();
    const history = useHistory()
    const apps = Object.values(appsObj);
    apps.forEach((app) => {
        app.task = tasksObj[app?.taskId];
    });

    useEffect(() => {
        dispatch(allAppointments())
    }, [dispatch])

    useEffect(() => {
        dispatch(allTasks())
    }, [dispatch])

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(cancelAppointment(e.target.id))
        // history.push('/appointments')
    }


    return (
        <div>
            <h1> Appointments </h1>
            <div>
                {apps?.map((app) => (
                    <div>
                        <NavLink to={`/tasks/${app?.taskId}`}>
                            <img src={app?.task?.pictures} className="app-img"/>
                        </NavLink>
                        <div>
                            <div>{app?.task?.name}</div>
                            <div> Payment: ${app?.task?.price}</div>
                            <div>Appointment: {app?.month} {app?.day} {app.time} {app.ap}</div>
                        <button
                            onClick={handleDelete}
                            id={app.id}
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
