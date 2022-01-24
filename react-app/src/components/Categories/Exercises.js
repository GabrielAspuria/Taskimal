import { useSelector, useDispatch } from 'react-redux'
import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { allTasks } from '../../store/tasks';

const Exercises = () => {
    const tasksObj = useSelector(state => state.tasks)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allTasks())
    }, [dispatch])

    const tasks = Object.values(tasksObj)
    const exercises = tasks.filter((task) => task.category === 'Exercise')

    return (
        <div>
            {exercises.map((exercise) => (
                <div>
                    {exercise?.name} ${exercise?.price}
                    <div>
                        <NavLink to={`/tasks/Exercise/${exercise?.id}`}>
                            <img src={exercise.pictures} />
                        </NavLink>
                    </div>
                </div>

            ))}
        </div>
    )
}

export default Exercises
