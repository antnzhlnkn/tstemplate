import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, isEmpty, isLoaded} from 'react-redux-firebase'
import {BrowserRouter as Router, Link, Route,} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Home from "../containers/Home";
import Profile from "../containers/Profile";
import OtherTodo from "./OtherTodo"

interface IProps {
    auth?: any;
    firestore?: any;
    firebase?: any;
}

export class Header extends Component<IProps, any> {

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
                    <Button><Link to='/tstemplate/other'>Other</Link></Button>
                    <Button><Link to='/tstemplate/profile'>Profile</Link></Button>
                    <Route exact path='/tstemplate' component={Home}/>
                    <Route path='/tstemplate/other' component={OtherTodo}/>
                    <Route path='/tstemplate/profile' component={Profile}/>
                </Router>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.firebase.auth
});

const mapDispatchToProps = {};

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    firebaseConnect()
)(Header)
