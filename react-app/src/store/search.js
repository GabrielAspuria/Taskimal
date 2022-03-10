const GET_RESULTS = 'search/GET_RESULTS'

const getResults = (search) => ({
    type: GET_RESULTS,
    search
})

// export const searchResults = (task, search) => async (dispatch) => {
//     const res = await fetch(`/api/search/`, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(task)
//     })
//     const data = await res.json()
//     dispatch(getResults(data))
//     return data
// }

export const searchResults = (q) => async(dispatch) => {
    const res = await fetch(`/api/search?q=${q}`)

    if (res.ok) {
        const searchRes = await res.json();
        dispatch(getResults(searchRes.tasks))
        return searchRes
    }
}

const searchReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_RESULTS:
            newState = action.search
            return newState;
        default:
            return state;
    }
}

export default searchReducer;
