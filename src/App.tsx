import React, { Component } from 'react'
import { Provider } from "react-redux"

import store from "./redux/store/store"
import  AuthButton from "./components/AuthButton"
import TodoList from "./components/TodoList";


class App extends Component <any, any>  {
  render() {
    return (
        <Provider store={store}>
          <div>
            <AuthButton />
            <TodoList />
          </div>
        </Provider>
    )
  }
}

export default App