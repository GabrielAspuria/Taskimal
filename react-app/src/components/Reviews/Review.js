import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskReviews } from '../../store/review';
import { allUsers } from '../../store/users';
import { useParams } from 'react-router-dom';
import { createReview } from '../../store/review';
import EditReview from './EditReview';
import DeleteReviewButton from './DeleteReviewbutton';
import '../CSS/TaskDetail.css'

const Reviews = ({ task, users }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const userlist = useSelector(state => state.users)
    const eachUser = Object.values(Object.values(userlist)[0])
    const reviewsObj = useSelector(state => state.reviews)
    const reviews = Object.values(reviewsObj)
    reviews.forEach((user) => {
        console.log("USER", user)
        user.username = users[user?.userId - 1]
    })
    console.log("REVIEWS",reviews)
    const check = reviews?.filter((user) => {
        return sessionUser?.id === user?.userId
    })


    const { id } = useParams()
    const taskReview = reviews?.filter(review => {
        // console.log('REVIEW', review)
        // const checkUser = eachUser.map((user) => {
        //     console.log("USER", user)
        //     if (user.id === review.userId) {
        //         // review.firstname === true
        //     }
        // })
        // console.log("CHECKUSER", checkUser)
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
        setRating('★★★★★')
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
            <h1>Reviews</h1>
            <div>
                {taskReview?.length > 0 &&
                    taskReview?.map(review => (
                        <div>
                            <p>{review.username.firstname} {review.username.lastname}: {review.rating === 5? "★★★★★" : review.rating === 4? "★★★★" : review.rating === 3? "★★★" : review.rating === 2? "★★" : "★"}</p>
                            <p>{review.review}</p>
                            {sessionUser?.id === review?.userId && (
                                <div>
                                    <EditReview
                                        sessionUser={sessionUser}
                                        rating={review?.rating}
                                        review={review?.review}
                                        id={review?.id}
                                    />
                                </div>
                            )}
                        </div>
                    )
                )}
            </div>
            <div>

            {sessionUser !== null && !check.length && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='rating-label'>Rating:</label>
                        <select
                            className="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            >
                            <option value='1'>★</option>
                            <option value='2'>★★</option>
                            <option value='3'>★★★</option>
                            <option value='4'>★★★★</option>
                            <option value='5'>★★★★★</option>
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
