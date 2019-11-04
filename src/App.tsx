import React, { Component } from 'react'
import { Provider } from "react-redux"

import store from "./redux/store/store"
import { AuthButton } from "./components/AuthButton"


class App extends Component <any, any>  {
  render() {
    return (
        <Provider store={store}>
          <div>
            <AuthButton />
          </div>
        </Provider>
    )
  }
}

export default App