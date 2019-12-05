import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, isEmpty, isLoaded} from 'react-redux-firebase'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

interface IProps {
    auth?: object,
    firestore?: any,
    firebase?: any
}

export class AuthButton extends Component<IProps, any> {

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
                <div>
                    <div>4len</div>
                    <Button variant="outlined"
                            onClick={
                                () => this.props.firebase.login({provider: 'google', type: 'popup'})
                            }
                    >Log in with Google
                    </Button>
                </div>
            )
        }
        return (
            <div>
                <Button variant="outlined"
                        style={{width: "100%"}}
                        onClick={() => this.props.firebase.logout()}
                > Logout</Button>
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
)(AuthButton)
