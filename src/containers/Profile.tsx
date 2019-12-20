import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, isLoaded} from 'react-redux-firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import {Container} from "../components/container";
import {InfoBlock} from "../components/InfoBlock";

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
                    <InfoBlock title={`Name:`} value={this.props.auth.displayName}/>
                    <InfoBlock title={`Email:`} value={this.props.auth.email}/>
                    <InfoBlock title={`Registration date:`}
                               value={moment.unix(this.props.auth.createdAt / 1000).format("LLLL")}/>
                    <InfoBlock title={`Last login date:`}
                               value={moment.unix(this.props.auth.lastLoginAt / 1000).format("LLLL")}/>
                    <InfoBlock title={`Avatar:`} value={this.props.auth.photoURL} size={`100`} isImage={true}/>
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
