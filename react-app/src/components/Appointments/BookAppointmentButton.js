import { useSelector, useDispatch } from "react-redux";
import React, {useState, useEffect } from "react";
import { bookAppointment, allAppointments } from "../../store/appointments";
import { useHistory } from "react-router-dom";
import '../CSS/BookAppointment.css'

const BookAppointmentButton = (props) => {
    const dispatch = useDispatch()
    const date = Date()
    const thisMonth = date.split(' ')[1]
    const today = parseInt(date.split(' ')[2])
    const thisYear = parseInt(date.split(' ')[3])
    const signedInUser = useSelector(state => state.session.user)
    const history = useHistory()
    const appointmentsObj = useSelector(state => state.appointments)
    const appointments = Object.values(appointmentsObj)

    useEffect(() => {
        dispatch(allAppointments())
    }, [dispatch])


    const [errors, setErrors] = useState([])
    const [year, setYear] = useState(thisYear)
    const [month, setMonth] = useState(thisMonth)
    const [day, setDay] = useState(today)
    const [time, setTime] = useState('8')
    const [ap, setAp] = useState('AM')
    // const checkAppointments = appointments.forEach((appointment) => apps.push(appointment))
    const checkApps = appointments.filter((app) => (signedInUser.id === app.userId) && month === app.month && parseInt(day) === app.day && parseInt(year) === app.year)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const thirtyMonths = ['Apr', 'Jun', 'Sep', 'Nov']
        const tooEarly = ['12', '1', '2', '3', '4', '5', '6', '7']
        const tooLate = ['9', '10', '11']

        const validationErrors = []
        // const dayRegex = /^[0-9]+(\.[0-9][0-9])?$/;
        // if(parseInt(year) < thisYear) validationErrors.push ('Cannot schedule a day in the past')
        if((parseInt(year) === thisYear && month === thisMonth && day < today && day > 0) || ((months.indexOf(month) < months.indexOf(thisMonth) && parseInt(year) <= thisYear)) || parseInt(year) < thisYear) validationErrors.push('Cannot schedule a day in the past')
        if(day < 1 || day > 31 || (month === 'Feb' && day > 28) || (thirtyMonths.includes(month) && day > 30)) validationErrors.push('Please enter a valid day')
        // if(thirtyMonths.includes(month) && day > 30) validationErrors.push('Please enter a valid day')
        // if(!dayRegex.test(day)) validationErrors.push('Please enter a numeric day')
        // if(month === 'Feb' && day > 28) validationErrors.push("Please enter a valid day")
        if(checkApps.length) validationErrors.push('You already have an appointment for that day')
        if(ap === 'AM' && tooEarly.includes(time)) validationErrors.push('Please choose a time between 8 AM and 8 PM')
        if(ap === 'PM' && tooLate.includes(time)) validationErrors.push('Please choose a time between 8 AM and 8 PM')
        setErrors(validationErrors)

        if(validationErrors.length === 0) {
            const newAppointment = {
                year,
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
                        <div><label className="year"> Year </label><label className="month"> Month </label> <label className="day"> Day </label> <label className="time"> Time </label></div>
                        <div>
                            <input
                                className="year-input"
                                type='number'
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            >
                            </input>
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
                                type='number'
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
