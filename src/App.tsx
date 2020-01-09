import React from 'react';
import { Provider } from 'react-redux';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from './redux/store/store';
import AuthButton from './components/AuthButton';
import Home from './containers/Home';
import Profile from './containers/Profile';
import OtherTodo from './components/OtherTodo';
import HistoryItem from './components/HistoryItem';
import AppWrapper from './containers/App-wrapper';
import { PrivateRoute } from './router/private-router';
import History from './containers/History';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <AppWrapper>
            <Route exact path="/auth/login" component={AuthButton} />

            <PrivateRoute store={store} exact path="/" component={Home} />
            <PrivateRoute store={store} exact path="/other" component={OtherTodo} />
            <PrivateRoute store={store} exact path="/profile" component={Profile} />
            <PrivateRoute store={store} exact path="/history" component={HistoryItem} />
            <PrivateRoute store={store} exact path="/history/:todoId" component={History} />
          </AppWrapper>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
