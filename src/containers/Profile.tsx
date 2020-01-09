import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import { Container } from '../components/container';
import { InfoBlock } from '../components/InfoBlock';

interface IProps {
  auth?: any;
  firestore?: any;
  firebase?: any;
}

function Profile(props: IProps) {
  const { auth } = props;
  if (!isLoaded(auth)) {
    return (
      <span>
        <CircularProgress color="secondary" />
      </span>
    );
  }
  return (
    <Container>
      <div style={{ width: '100%' }}>
        <InfoBlock title="Name:" value={auth.displayName} />
        <InfoBlock title="Email:" value={auth.email} />
        <InfoBlock
          title="Registration date:"
          value={moment.unix(auth.createdAt / 1000).format('LLLL')}
        />
        <InfoBlock
          title="Last login date:"
          value={moment.unix(auth.lastLoginAt / 1000).format('LLLL')}
        />
        <InfoBlock title="Avatar:" value={auth.photoURL} size="100" isImage />
      </div>
    </Container>
  );
}

const mapStateToProps = (state: any) => ({
  auth: state.firebase.auth,
});

const mapDispatchToProps = {};

export default compose<any>(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect(),
)(Profile);
