import React, { Component } from 'react'
import { Provider } from "react-redux"
import './index.css'
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom'

import store from "./redux/store/store"
import AuthButton from "./components/AuthButton"
import TodoList from "./components/TodoList";
import Profile from "./components/Profile"
import Header from "./components/Header"


class App extends Component <any, any>  {
  render() {
    return (
        <Provider store={store}>
            <div>
            <AuthButton/>
            <Header/>
            </div>
        </Provider>

    )
  }
}

export default App
