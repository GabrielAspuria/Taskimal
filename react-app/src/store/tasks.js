const GET_ALL_TASKS = 'tasks/GET_ALL_TASKS';
const ADD_TASK = 'file/ADD_TASK'
const EDIT_TASK = 'tasks/EDIT_TASK'
const DELETE_TASK = 'tasks/DELETE_TASK'

const getAllTasks = (tasks) => ({
    type: GET_ALL_TASKS,
    tasks
})

const addTask = task => ({
    type: ADD_TASK,
    task
})

const updateTask = task => ({
    type: EDIT_TASK,
    task
})

const deleteTask = id => ({
    type: DELETE_TASK,
    id
})

export const allTasks = () => async (dispatch) => {
    const response = await fetch("/api/tasks/");
    const data = await response.json();
    dispatch(getAllTasks(data));
    return data;
}

export const createTask = (fileForm) => async (dispatch) => {
    const {
        userId,
        animal,
        name,
        description,
        price,
        category,
        pictures,
        file,
    } = fileForm

    const form = new FormData()
    form.append('animal', animal)
    form.append('userId', userId)
    form.append('name', name)
    form.append('description', description)
    form.append('price', price)
    form.append('category', category)
    form.append('pictures', pictures)
    form.append('file', file)
    const res = await fetch('/api/tasks/', {
        method: 'POST',
        body: form
    });
    // if (res.ok) {
    //     const data = await res.json()
    //     dispatch(addTask(data))
    //     return data
    // }
    const uploadedFile = await res.json()
    if (!uploadedFile.errors){
        dispatch(addTask(uploadedFile))
    }
    return uploadedFile
}

export const editTask = (task, id) => async(dispatch) => {
    const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(updateTask(data))
        return data
    }
}

export const removeTask = (id) => async (dispatch) => {
    const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
    })
    if (res.ok){
        dispatch(deleteTask(id))
    }
}

const tasksReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_TASKS:
            // newState = { ...state };
            newState = {}
            action.tasks.tasks.forEach((task) => {
                newState[task.id] = task;
            });
            return newState;

        case ADD_TASK:
            newState = { ...state, [action.task.userId]: action.task }
            return newState;

        case EDIT_TASK:
            newState = { ...state }
            newState[action.task.id] = action.task
            return newState

        case DELETE_TASK:
            newState = { ...state }
            delete newState[action.id]
            return newState

        default:
            return state;
    }
}

export default tasksReducer
