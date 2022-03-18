import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskReviews } from '../../store/review';
import { allUsers } from '../../store/users';
import { useParams } from 'react-router-dom';

const Reviews = ({ task }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const reviewsObj = useSelector(state => state.reviews)
    const reviews = Object.values(reviewsObj)
    const { id } = useParams()
    const review = reviews?.filter(re => {
        return re?.taskId === task?.id
    })
    console.log("REVIEWS", reviews)


    useEffect(() => {
        dispatch(taskReviews(task?.id))
    }, [dispatch, task?.id])

    return (
        <div>
           hello
        </div>
    )
}

export default Reviews
