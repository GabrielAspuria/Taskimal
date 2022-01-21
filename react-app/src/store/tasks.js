const GET_ALL_TASKS = 'tasks/GET_ALL_TASKS';

const getAllTasks = (tasks) => ({
    type: GET_ALL_TASKS,
    tasks
})

export const allTasks = () => async (dispatch) => {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    dispatch(getAllTasks(data));
    return data;
}

const tasksReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_TASKS:
            newState = { ...state };
            action.tasks.tasks.forEach((task) => {
                newState[task.id] = task;
            });
            return newState;

        default:
            return state;
    }
}

export default tasksReducer
