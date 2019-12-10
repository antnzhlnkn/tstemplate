import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import withStyles from '@material-ui/core/styles/withStyles';
import {Container} from "./container"
import {AppBar, IconButton, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";

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
    root: {
        display: 'flex',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
});

interface IState {
    open: boolean;
}

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

export class Navi extends Component<INavProps, IState> {
    constructor(props: INavProps) {
        super(props);
        this.state = {
            open: false,
        };
    }

    render() {
        const {classes} = this.props;

        console.log(this.props);
        return (
            <Container>
                <div className={classes.root}>
                    <Menu open={this.state.open}>
                        <MenuItem component={Link} to={`/`} onClick={this.MenuClose}>
                            Home
                        </MenuItem>
                        <MenuItem component={Link} to={`/other`} onClick={this.MenuClose}>
                            Other
                        </MenuItem>
                        <MenuItem component={Link} to={`/profile`} onClick={this.MenuClose}>
                            Profile
                        </MenuItem>
                    </Menu>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton onClick={this.MenuOpen} edge="start" className={classes.menuButton}
                                        color="inherit" aria-label="menu">
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Shit Counter
                            </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                </div>
            </Container>
        )
    }

    private MenuOpen = (event: any) => {
        this.setState({open: true});
    };

    private MenuClose = (event: any) => {
        this.setState({open: false});
    };
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
