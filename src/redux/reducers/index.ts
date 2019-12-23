import {combineReducers} from 'redux'
import {firebaseReducer} from 'react-redux-firebase'
import {firestoreReducer} from 'redux-firestore'
import {initialState as todosInitial, todoReducer} from './todos'

export const initialState = {
    todos: todosInitial
};

export const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    todos: todoReducer
});
