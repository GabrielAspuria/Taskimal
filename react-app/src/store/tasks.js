const GET_ALL_TASKS = 'tasks/GET_ALL_TASKS';
const GET_EXERCISES = 'tasks/GET_EXERCISES';
const GET_TRAINING = 'tasks/GET_TRAINING';
const GET_BOARDING = 'tasks/GET_BOARDING';
const GET_MISC = 'tasks/GET_MISC';

const getAllTasks = (tasks) => ({
    type: GET_ALL_TASKS,
    tasks
})

// const getExercises = (exercises) => ({
//     type: GET_EXERCISES,
//     exercises
// })

// const getTraining = (trainings) => ({
//     type: GET_TRAINING,
//     trainings
// })

// const getBoarding = (boardings) => ({
//     type: GET_BOARDING,
//     boardings
// })

// const getMisc = (miscs) => ({
//     type: GET_MISC,
//     miscs
// })

export const allTasks = () => async (dispatch) => {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    dispatch(getAllTasks(data));
    return data;
}

// export const allExercises = () => async (dispatch) => {
//     const res = await fetch ('api/exercise')
//     const data = await res.json();
//     dispatch(getExercises(data));
//     return data
// }


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
