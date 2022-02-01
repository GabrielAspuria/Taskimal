import { useSelector, useDispatch } from "react-redux";
import React, {useState } from "react";
import { bookAppointment } from "../../store/appointments";
import { useHistory } from "react-router-dom";
import '../CSS/BookAppointment.css'

const BookAppointmentButton = (props) => {
    const dispatch = useDispatch()
    const date = Date()
    const thisMonth = date.split(' ')[1]
    const today = date.split('')[2]
    const signedInUser = useSelector(state => state.session.user)
    const history = useHistory()

    const [errors, setErrors] = useState([])
    const [month, setMonth] = useState("Jan")
    const [day, setDay] = useState('1')
    const [time, setTime] = useState(1)
    const [ap, setAp] = useState('AM')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const tooEarly = [12, 1, 2, 3, 4, 5, 6]
        const tooLate = [10, 11]
        const thirtyMonths = ['Apr', 'Jun', 'Sep', 'Nov']

        const validationErrors = []
        const dayRegex = /^[0-9]+(\.[0-9][0-9])?$/;
        if(thisMonth === month && day < today && day > 0 && day < 31) validationErrors.push('Cannot schedule day in the past')
        if(day < 1 || day > 31) validationErrors.push('Please enter a valid day')
        if(thirtyMonths.includes(month) && day > 30) validationErrors.push('Please enter a valid day')
        if(!dayRegex.test(day)) validationErrors.push('Please enter a numeric day')
        if(month === 'Feb' && day > 28) validationErrors.push('Please enter a valid day')
        if(ap === 'AM' && tooEarly.includes(time)) validationErrors.push('Appointment is too early. Please choose a time between 8 AM and 10 PM')
        if(ap === 'PM' && tooLate.includes(time)) validationErrors.push('Appointment is too late. Please choose a time between 8 AM and 10 PM')
        setErrors(validationErrors)

        if(validationErrors.length === 0) {
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
    }

    return (
        <div className="appointment-container">
            <h1 className="book-appointment-header"> Book Appointment </h1>
            <div>
                <ul>
                    {errors.length > 0 &&
                    errors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className='app-form-info'>
                        <div><label className="month"> Month </label> <label className="day"> Day </label> <label className="time"> Time </label></div>
                        <div>
                            <select
                            className="month-button"
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
                            <input
                                className="app-input"
                                type='text'
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                            />
                            <select
                                className="time-input"
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
                                className="ap-input"
                                value={ap}
                                onChange={(e) => setAp(e.target.value)}
                            >
                                <option value='AM'> AM </option>
                                <option value='PM'> PM </option>
                            </select>
                        </div>
                    </div>
                </div>
                <button className="book-app">
                    Book Appointment
                </button>
            </form>
        </div>
    )
}

export default BookAppointmentButton
