const GET_USERS = 'session/GET_USERS';

const getUsers = (users) => ({
    type: GET_USERS,
    users
  })

export const allUsers = () => async (dispatch) => {
  const response = await fetch('/api/users/')
  if (response.ok) {
    const data = await response.json()
    dispatch(getUsers(data))
    return data
  }
}

const userReducer = (state = {}, action) => {
    let newState;
    switch(action.type){
        case GET_USERS:
              newState = { ...state, users: { ...state.users } }
              action.users.users.forEach(user => {
                newState.users[user.id] = user
              })
              return newState;

        default:
            return state;
    }

}

export default userReducer
