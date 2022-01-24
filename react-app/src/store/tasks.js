const GET_ALL_TASKS = 'tasks/GET_ALL_TASKS';
const ADD_TASK = 'tasks/ADD_TASK'
// const ADD_EXERCISE = 'tasks/ADD_EXERCISE'
// const ADD_TRAINING = 'tasks/ADD_TRAINING'
// const ADD_BOARDING = 'tasks/ADD_BOARDING'
// const ADD_MISC = 'tasks/ADD_MISC'
// const EDIT_EXERCISE

const getAllTasks = (tasks) => ({
    type: GET_ALL_TASKS,
    tasks
})

const addTask = task => ({
    type: ADD_TASK,
    task
})

// const addExercise = exercise => ({
//     type: ADD_EXERCISE,
//     exercise
// })


// const addTraining = training => ({
//     type: ADD_TRAINING,
//     training
// })

// const addBoarding = boarding => ({
//     type: ADD_BOARDING,
//     boarding
// })

// const addMisc = misc => ({
//     type: ADD_MISC,
//     misc
// })

export const allTasks = () => async (dispatch) => {
    const response = await fetch("/api/tasks/");
    const data = await response.json();
    dispatch(getAllTasks(data));
    return data;
}

export const createTask = (task) => async (dispatch) => {
    const res = await fetch('/api/tasks/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(task)
    });
    if (res.ok) {
        const data = await res.json()
        dispatch(addTask(data))
        return data
    }
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

        case ADD_TASK:
            return { ...state, [action.task.id]: action.task }

        default:
            return state;
    }
}

export default tasksReducer
