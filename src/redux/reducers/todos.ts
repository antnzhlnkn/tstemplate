export const initialState = {
    selectedTodo: null,
    completedTodo: null,
    privatedTodo: null,
    isPrivate: false,
};

export function todoReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'selectTodo':
            console.log('xuy');
            return {
                ...state,
                selectedTodo: action.todo,
            };
        case 'completTodo':
            return {
                ...state,
                completedTodo: action.todo
            };
        case 'privateTodo':
            console.log(action.isPrivate);
            action.isPrivate = !action.isPrivate;
            console.log(action.isPrivate);
            console.log(state);
            return {
                ...state,
                isPrivate: !action.isPrivate,
            };

        default:
            return state;
    }
}
