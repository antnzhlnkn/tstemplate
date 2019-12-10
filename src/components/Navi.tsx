import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import withStyles from '@material-ui/core/styles/withStyles';
import {Container} from "./container"

const styles = (theme: any) => ({
    container: {
        height: 226,
        display: 'flex',
        cursor: 'pointer',
        position: 'relative' as 'relative',
    },
    text: {
        position: 'absolute' as 'absolute',
        top: 20,
        left: 20,
        right: 20,
        color: theme.palette.primary.light,
        fontSize: 18,
        lineHeight: '20px',
        textAlign: 'center' as 'center',
    },
    icon: {
        margin: 'auto',
        fontSize: 70,
        color: theme.palette.primary.main,
    },
});

interface INavLink {
    title: string;
    to?: string;

    onClick?(): void;
}

interface INavProps {
    links?: INavLink[];
    auth?: any,
    firestore?: any,
    firebase?: any,
    classes?: any;
}

export class Navi extends Component<INavProps> {

    render() {
        const {classes} = this.props;

        console.log(this.props.links);
        return (
            <Container>
                <div className={classes.container}>
                    ads
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
    (withStyles(styles) as any),
    firebaseConnect()
)(Navi)
