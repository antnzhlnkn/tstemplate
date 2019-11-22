import React, {Component} from 'react'
import {Provider} from "react-redux"
import './index.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import store from "./redux/store/store"
import AuthButton from "./components/AuthButton"
import Home from "./containers/Home";
import Profile from "./components/Profile"
import OtherTodo from "./components/OtherTodo";
import {AppWrapper} from "./containers/App-wrapper";
import {PrivateRoute} from "./router/private-router";

class App extends Component <any, any> {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <AppWrapper>
                            <Route exact path="/auth/login" component={AuthButton}/>

                            <PrivateRoute store={store} exact path="/" component={Home}/>
                            <PrivateRoute store={store} exact path="/other" component={OtherTodo}/>
                            <PrivateRoute store={store} exact path="/profile" component={Profile}/>
                        </AppWrapper>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default App
