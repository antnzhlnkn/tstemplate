import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import { reducer as todosReducer, initialState as todosInitial } from './todos'

export const initialState = {
    todos: todosInitial
}

export const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    todos: todosReducer
})