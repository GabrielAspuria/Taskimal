import { useSelector, useDispatch } from "react-redux";
import React, {useState } from "react";
import { bookAppointment } from "../../store/appointments";
import { useHistory } from "react-router-dom";

const BookAppointmentButton = (props) => {
    const dispatch = useDispatch()
    const date = new Date()
    const signedInUser = useSelector(state => state.session.user)
    const history = useHistory()
    console.log("DATE",date.getDate() === 27)

    const [month, setMonth] = useState("Jan")
    const [day, setDay] = useState('1')
    const [time, setTime] = useState(1)
    const [ap, setAp] = useState('AM')

    const resetForm = () => {
        setMonth("Jan")
        setDay(date.getDate())
        setTime(date.getHours())
        setAp('AM')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newAppointment = {
            month,
            day,
            time,
            ap,
            userId: signedInUser.id,
            taskId: props.task.id
        }
        await dispatch(bookAppointment(newAppointment))
        history.push('/appointments')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1> Appointment Form </h1>
                <label> Month:</label>
                <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                >
                    <option value='Jan'> Jan </option>
                    <option value='Feb'> Feb </option>
                    <option value='Mar'> Mar </option>
                    <option value='Apr'> Apr </option>
                    <option value='May'> May </option>
                    <option value='Jun'> Jun </option>
                    <option value='Jul'> Jul </option>
                    <option value='Aug'> Aug </option>
                    <option value='Sep'> Sep </option>
                    <option value='Oct'> Oct </option>
                    <option value='Nov'> Nov </option>
                    <option value='Dec'> Dec </option>
                </select>
                <label> Day </label>
                <input
                    type='text'
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                />
                <label> Time </label>
                <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                >
                    <option value={1}> 1 </option>
                    <option value={2}> 2 </option>
                    <option value={3}> 3 </option>
                    <option value={4}> 4 </option>
                    <option value={5}> 5 </option>
                    <option value={6}> 6 </option>
                    <option value={7}> 7 </option>
                    <option value={8}> 8 </option>
                    <option value={9}> 9 </option>
                    <option value={10}> 10 </option>
                    <option value={11}> 11 </option>
                    <option value={12}> 12 </option>
                </select>
                <select
                    value={ap}
                    onChange={(e) => setAp(e.target.value)}
                >
                    <option value='AM'> AM </option>
                    <option value='PM'> PM </option>
                </select>
                <button>
                    Book Appointment
                </button>
            </form>
        </div>
    )
}

export default BookAppointmentButton
