import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskReviews } from '../../store/review';
import { allUsers } from '../../store/users';
import { useParams } from 'react-router-dom';
import '../CSS/TaskDetail.css'

const Reviews = ({ task }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const users = useSelector(state => state.session.users)
    const reviewsObj = useSelector(state => state.reviews)
    const reviews = Object.values(reviewsObj)
    const { id } = useParams()
    const taskReview = reviews?.filter(review => {
        return review?.taskId === task?.id
    })

    useEffect(() => {
        dispatch(taskReviews(task?.id))
    }, [dispatch, task?.id])

    useEffect(() => {
        dispatch(allUsers())
    }, [dispatch])

    return (
        <div className='reviews'>
           {taskReview?.length > 0 &&
               taskReview?.map(review => (
                   <div>
                       <p>{review.rating} {review.review}</p>
                   </div>
               )
           )}
        </div>
    )
}

export default Reviews
