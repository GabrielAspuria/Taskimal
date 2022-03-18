const GET_REVIEWS = 'reviews/GET_REVIEWS'

const getTaskReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
})

export const taskReviews = (id) => async (dispatch) => {
    const res = await fetch(`/api/tasks/${id}/reviews`)
    const data = await res.json()
    dispatch(getTaskReviews(data))
    return data
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

        default:
            return state;
    }
}

export default reviewsReducer
