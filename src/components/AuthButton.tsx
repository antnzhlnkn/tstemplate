import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

interface IProps {
  auth?: object;
  firestore?: any;
  firebase?: any;
}

function AuthButton(props: IProps) {
  const { firebase, auth } = props;
  if (!isLoaded(auth)) {
    return (
      <span>
        <CircularProgress color="secondary" />
      </span>
    );
  }
  if (isEmpty(auth)) {
    return (
      <div>
        <div>4len</div>
        <Button
          variant="outlined"
          onClick={
                        () => firebase.login({ provider: 'google', type: 'popup' })
                    }
        >
                    Log in with Google
        </Button>
      </div>
    );
  }
  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => firebase.logout()}
      >
                Logout
      </Button>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  auth: state.firebase.auth,
});

const mapDispatchToProps = {};

export default compose<any>(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect(),
)(AuthButton);
