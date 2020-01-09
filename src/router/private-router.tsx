import * as React from 'react';
import { Store } from 'redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';


interface IPrivateRouterProps extends RouteProps {
  store: Store<any>;
}

export function PrivateRoute(props: IPrivateRouterProps) {
  const { store, component: Component, ...rest } = props as any;
  const { uid } = (store.getState()).firebase.auth;
  return (
    <Route
      {...rest}
      render={(props) => (uid
        ? (
          <Component {...props} />
        )
        : (
          <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
        ))}
    />
  );
}
