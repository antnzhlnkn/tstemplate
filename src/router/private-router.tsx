import * as React from "react";
import { Store } from "redux";
import { Redirect, Route, RouteProps } from "react-router-dom";


interface IPrivateRouterProps extends RouteProps {
    store: Store<any>;
}

interface IPrivateRouterState { }

export class PrivateRoute extends React.Component<IPrivateRouterProps, IPrivateRouterState> {

    render() {
        const { store, component: Component, ...rest } = this.props as any;
        const { uid } = (store.getState() as any).firebase.auth;
        return (
            <Route
                {...rest}
                render={props => !!uid ?
                    (
                        <Component {...props} />
                    )
                    :
                    (
                        <Redirect to={{ pathname: "/auth/login", state: { from: props.location } }} />
                    )
                }
            >
            </Route>
        );
    }
}