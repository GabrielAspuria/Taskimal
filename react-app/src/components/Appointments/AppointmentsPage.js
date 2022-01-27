import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allAppointments } from "../../store/appointments";

const AppointmentsPage = () => {
    const appsObj = useSelector(state => state.appointments)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allAppointments())
    }, [dispatch])

    const apps = Object.values(appsObj)

    return (
        <div>
            <h1> Appointments </h1>
        </div>
    )
}

export default AppointmentsPage
