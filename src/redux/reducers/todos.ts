export const initialState = {
  selectedTodo: null,
  completedTodo: null,
  privatedTodo: null,
  isPrivate: false,
};

export function todoReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'selectTodo':
      return {
        ...state,
        selectedTodo: action.todo,
      };
    case 'completTodo':
      return {
        ...state,
        completedTodo: action.todo,
      };
    case 'privateTodo':
      return {
        ...state,
        isPrivate: !action.isPrivate,
      };

    default:
      return state;
  }
}
