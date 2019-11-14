import React, {Component} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {firebaseConnect, isEmpty, isLoaded} from 'react-redux-firebase'
import AuthButton from "./AuthButton"
import {
    BrowserRouter as Router,
    Route,
    Link, BrowserRouter,
} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import moment from 'moment';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Grid} from "@material-ui/core";
import TodoList from "./TodoList";
import Profile from "./Profile";
import Card from "@material-ui/core/Card";

interface IProps {
    auth?:any,
    firestore?: any,
    firebase?:any,
}

export class Header extends Component<IProps,any> {

    render() {
        if (!isLoaded(this.props.auth)) {
            return (
                <span>
                    <CircularProgress color="secondary"/>
                </span>
            )
        }
        if (isEmpty(this.props.auth)) {
            return (
                <Box>
                    4len
                </Box>
            )
        }
        return (
            <div>
                <Router>
                    <Button><Link to='/tstemplate'>Home</Link></Button>
                    <Button><Link to='/tstemplate/profile'>Profile</Link></Button>
                    <Route exact path='/tstemplate' component={TodoList} />
                    <Route path='/tstemplate/profile' component={Profile} />
                </Router>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.firebase.auth
});

const mapDispatchToProps = {
};

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    firebaseConnect()
)(Header)
