import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskReviews } from '../../store/review';
import { allUsers } from '../../store/users';
import { useParams } from 'react-router-dom';
import { createReview } from '../../store/review';
import EditReview from './EditReview';

const Reviews = ({ task, users }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const reviewsObj = useSelector(state => state.reviews)
    console.log("SESSION",sessionUser)
    const reviews = Object.values(reviewsObj)
    reviews.forEach((user) => {
        user.username = users[user?.userId]

        console.log("USER",user.username, user?.userId)
    })
    const { id } = useParams()
    const taskReview = reviews?.filter(review => {
        return review?.taskId === task?.id
    })
    const taskId = task?.id

    const [rating, setRating] = useState('5')
    const [review, setReview] = useState('')

    useEffect(() => {
        dispatch(taskReviews(task?.id))
    }, [dispatch, task?.id])

    useEffect(() => {
        dispatch(allUsers())
    }, [dispatch])

    const resetForm = () => {
        setRating('5')
        setReview('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (review.length) {
            const newTaskReview = {
                userId: sessionUser.id,
                taskId,
                rating,
                review
            }
            await dispatch(createReview(newTaskReview))
            resetForm()
        }
    }

    return (
        <div className='reviews'>
            <div>
                {taskReview?.length > 0 &&
                    taskReview?.map(review => (
                        <div>
                            <p>{review.username.firstname} {review.username.lastname}: {review.rating}</p>
                            <p>{review.review}</p>
                            {sessionUser?.id === review?.userId && (
                                <EditReview
                                    sessionUser={sessionUser}
                                    rating={review?.rating}
                                    review={review?.review}
                                />
                            )}
                        </div>
                    )
                )}
            </div>
            <div>
            {sessionUser !== null && (

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='rating-label'>Rating:</label>
                        <select
                            className="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            >
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                    </div>
                    <div>
                        <textarea
                        className='add-review-box'
                        placeholder='leave a review'
                        value={review}
                        maxLength='500'
                        onChange={(e) => setReview(e.target.value)}
                        />
                    </div>
                        <button className="submit-review">Submit</button>
                </form>
           )}
           </div>
        </div>
    )
}

export default Reviews
