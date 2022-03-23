const GET_REVIEWS = 'reviews/GET_REVIEWS'
const ADD_REVIEW = 'reviews/ADD_REVIEW'
const EDIT_REVIEW = 'reviews/EDIT_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

const getTaskReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
})

const addReview = (review) => ({
    type: ADD_REVIEW,
    review
})

const editReview = (review) => ({
    type: EDIT_REVIEW,
    review
})

const deleteReview = (id) => ({
    type: DELETE_REVIEW,
    id
})

export const taskReviews = (id) => async (dispatch) => {
    const res = await fetch(`/api/tasks/${id}/reviews`)
    const data = await res.json()
    dispatch(getTaskReviews(data))
    return data
}

export const createReview = (review) => async (dispatch) => {
    const res = await fetch(`/api/reviews/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(addReview(data))
        return data
    }
}

export const updateReview = (review, id) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    });
    const data = await res.json()
    dispatch(editReview(data))
    return data
}

export const removeReview = (id) => async (dispatch) => {
    const res = await fetch(`/api/comments/${id}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(deleteReview)
    }
}

const reviewsReducer = (state = {}, action) => {
    let newState;
    switch(action.type) {
        case GET_REVIEWS:
            newState = {}
            action.reviews.reviews.forEach((review) => {
                newState[review.id] = review
            })
            return newState;

        case ADD_REVIEW:
            newState = { ...state, [action.review.userId]: action.review }
            return newState

        case EDIT_REVIEW:
            newState = { ...state }
            newState[action.review.id] = action.review
            return newState;

        case DELETE_REVIEW:
            newState = { ...state }
            delete newState[action.id]
            return newState

        default:
            return state;
    }
}

export default reviewsReducer
