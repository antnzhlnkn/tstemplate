export const initialState = {
    selectedTodo: null,
    completedTodo:null
};

export function reducer(state = initialState, action) {
    if (action.type === "selectTodo") {
        return { ...state, selectedTodo: action.todo }
    }
    if (action.type === "completTodo") {
        action.todo.isDone = !action.todo.isDone;
        return { ...state, completedTodo: action.todo }
    }
    return state
}