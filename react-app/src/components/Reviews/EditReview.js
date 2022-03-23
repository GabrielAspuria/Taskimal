import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { updateReview } from '../../store/review';
import DeleteReviewButton from './DeleteReviewbutton';
import '../CSS/TaskDetail.css'

const EditReview = ({id, review, rating, sessionUser}) => {
    const dispatch = useDispatch()
    const [editReview, setReview] = useState(review)
    const [editRating, setRating] = useState(rating)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newReview = {
            review: editReview,
            rating: +editRating,
            taskId: review?.taskId,
            userId: sessionUser.id
        }
        await dispatch(updateReview(newReview, id))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='rating-label'>Rating:</label>
                    <select
                        className="rating"
                        value={editRating}
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
                    value={editReview}
                    maxLength='500'
                    onChange={(e) => setReview(e.target.value)}
                    />
                </div>
                <div className='edit-review-buttons'>
                    <button className="submit-review">Edit</button>
                    <DeleteReviewButton id={id}/>
                </div>
            </form>
        </div>
    )

}

export default EditReview
