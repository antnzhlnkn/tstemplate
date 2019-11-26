import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, isLoaded} from 'react-redux-firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import moment from 'moment';
import {Container} from "./container";
import Button from "@material-ui/core/Button";

interface IProps {
    auth?: any,
    firestore?: any,
    firebase?: any,
}

export class Profile extends Component<IProps, any> {

    render() {
        if (!isLoaded(this.props.auth)) {
            return (
                <span>
                    <CircularProgress color="secondary"/>
                </span>
            )
        }
        return (
            <Container>
                <div style={{width: '50%'}}>
                    <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
                        <Box p={1} m={1}>
                            Name:
                        </Box>
                        <Box p={1} m={1}>
                            {this.props.auth.displayName}
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
                        <Box p={1} m={1}>
                            Email:
                        </Box>
                        <Box p={1} m={1}>
                            {this.props.auth.email}
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
                        <Box p={1} m={1}>
                            Registration date:
                        </Box>
                        <Box p={1} m={1}>
                            {moment.unix(this.props.auth.createdAt / 1000).format("LLLL")}
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
                        <Box p={1} m={1}>
                            Last login date:
                        </Box>
                        <Box p={1} m={1}>
                            {moment.unix(this.props.auth.lastLoginAt / 1000).format("LLLL")}
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
                        <Box p={1} m={1}>
                            Avatar
                        </Box>
                        <Box p={1} m={1}>
                            <img width="100" height="100"
                                 alt='Avatar'
                                 src={this.props.auth.photoURL}
                            />
                        </Box>
                    </Box>
                    <Button variant="outlined"
                            style={{width: "100%"}}
                            onClick={() => this.props.firebase.logout()}
                    > Logout</Button>
                </div>
            </Container>
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
)(Profile)
