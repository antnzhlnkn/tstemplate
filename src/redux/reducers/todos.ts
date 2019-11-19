export const initialState = {
    selectedTodo: null,
    completedTodo:null,
    privatedTodo:null
};

export function reducer(state = initialState, action: any) {
    if (action.type === "selectTodo") {
        return { ...state, selectedTodo: action.todo }
    }
    if (action.type === "completTodo") {
        action.todo.isDone = !action.todo.isDone;
        return { ...state, completedTodo: action.todo }
    }
    if (action.type === "privateTodo") {
        action.todo.isprivate = !action.todo.isprivate;
        return { ...state, privatedTodo: action.todo }
    }
    return state
}
