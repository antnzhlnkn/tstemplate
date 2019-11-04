import {compose, createStore} from 'redux'
import {reactReduxFirebase} from 'react-redux-firebase'
import {reduxFirestore} from 'redux-firestore'


import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import firebaseConfig from '../../firebase/firebaseConfig'
import {initialState, rootReducer} from '../reducers'

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

let enhancers: any[];

enhancers = [
    reduxFirestore(firebase),
    reactReduxFirebase(firebase, {
        userProfile: 'users',
        useFirestoreForProfile: true,
    })
];
const {devToolsExtension} :any= window;
const reduxDevToolsExtension = devToolsExtension;
if (
    process.env.NODE_ENV === "development" &&
    typeof reduxDevToolsExtension === "function"
) {
    enhancers.push(reduxDevToolsExtension())
}
let composedEnhancers: any;
composedEnhancers = compose(
    ...enhancers
);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store