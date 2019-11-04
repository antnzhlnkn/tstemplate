import React, {Component} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {firebaseConnect, isEmpty, isLoaded} from 'react-redux-firebase'

interface IProps {
    auth?:object,
    firestore?: any,
    firebase?:any
}

export class AuthButton extends Component<IProps,any> {
    render() {
        if (!isLoaded(this.props.auth)) {
            return <span>...Loading</span>
        }
        if (isEmpty(this.props.auth)) {
            return (
                <div>
                    <button
                        onClick={
                            () => this.props.firebase.login({provider: 'google', type: 'popup'})
                        }
                    >Log in with Google
                    </button>
                </div>
            )
        }
        return <button
            style={{width: "20rem"}}
            onClick={() => this.props.firebase.logout()}
        > Logout</button>

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
)(AuthButton)