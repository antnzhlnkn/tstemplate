import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Navigation from '../components/Navigation';

const mapStateToProps = (state: any) => ({
  profileStore: state.firebase.auth,
});

interface IAppWrapperProps {
  profileStore?: any;

  dispatch?: Dispatch<any>;
}

@(connect as any)(mapStateToProps)

export default class AppWrapper extends React.Component<IAppWrapperProps> {
  render() {
    const links = [];
    const { children, profileStore } = this.props;
    if (!isLoaded(profileStore)) {
      return (
        <span>
          <CircularProgress color="secondary" />
        </span>
      );
    }
    if (profileStore.uid) {
      links.push({ title: 'Home', to: '/' });
      links.push({ title: 'Other', to: '/other' });
      links.push({ title: 'Profile', to: '/profile' });
    } else {
      links.push({ title: 'Login', to: '/auth/login' });
    }

    return (
      <main className="wrapper">
        <Navigation
          links={links}
        />
        {children}
      </main>
    );
  }
}
