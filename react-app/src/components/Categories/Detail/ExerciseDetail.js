import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { allTasks } from '../../../store/tasks'

export default ExerciseDetail = () => {
    const tasksObj = useSelector(state => state.tasks)
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(allTasks())
    }, [dispatch])

    const tasks = Object.values(tasksObj)
    

    return (
        <div>

        </div>
    )

}
