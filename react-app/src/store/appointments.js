const GET_APPOINTMENTS = 'appointments/GET_APPOINTMENTS'
const ADD_APPOINTMENT = 'appointments/ADD_APPOINTMENT'
const DELETE_APPOINTMENT = 'appointments/DELETE_APPOINTMENT'

const getAppointments = (appointments) => ({
    type: GET_APPOINTMENTS,
    appointments
})

const addAppointment = (appointment) => ({
    type: ADD_APPOINTMENT,
    appointment
})

const deleteAppointment = (appointment) => ({
    type: DELETE_APPOINTMENT,
    appointment
})

export const allAppointments = () => async (dispatch) => {
    const res = await fetch('/api/appointments/')
    const data = await res.json()
    dispatch(getAppointments(data))
    return data
}

export const bookAppointment = (appointment, taskId) => async (dispatch) => {
    const res = await fetch(`/api/tasks/${taskId}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(appointment)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(addAppointment(data))
        return data
    }
}

export const cancelAppointment = (id) => async (dispatch) => {
    const res = await fetch(`/api/appointments/${id}`, {
        method: 'DELETE'
    })
    if (res.ok){
        dispatch(deleteAppointment(id))
    }
}

const appointmentsReducer = (state = {}, action) => {
    let newState;
    switch(action.type) {
        case GET_APPOINTMENTS:
            newState = { ...state };
            action.appointments.appointments.forEach((appointment) => {
                newState[appointment.id] = appointment;
            })
            return newState;

        case ADD_APPOINTMENT:
            return { ...state, [action.appointment.userId]: action.appointment }

        case DELETE_APPOINTMENT:
            newState = { ...state };
            delete newState(action.id);
            return newState;

        default:
            return state;
    }
}

export default appointmentsReducer
