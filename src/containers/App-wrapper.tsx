import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Nav } from "../components/nav";
import {isLoaded} from "react-redux-firebase";
import CircularProgress from "@material-ui/core/CircularProgress";


const mapStateToProps = (state: any) => ({
    profileStore: state.firebase.auth
});

interface IAppWrapperProps {
    profileStore?: any;

    dispatch?: Dispatch<any>;
}

interface IAppWrapperState { }

@(connect as any)(mapStateToProps)

export class AppWrapper extends React.Component<IAppWrapperProps, IAppWrapperState> {

    render() {
        const links = [];
        if (!isLoaded(this.props.profileStore)) {
            return (
                <span>
                    <CircularProgress color="secondary"/>
                </span>
            )
        }
        if (this.props.profileStore.uid) {
            links.push({ title: "Home", to: "/" });
            links.push({ title: "Other", to: "/other" });
            links.push({ title: "Profile", to: "/profile" });
        } else {
            links.push({ title: "Login", to: "/auth/login" });
        }

        return (
            <main className="wrapper">
                <Nav
                    links={links} />

                {this.props.children}

            </main>
        );
    }
}