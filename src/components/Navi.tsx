import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, isEmpty} from 'react-redux-firebase'
import withStyles from '@material-ui/core/styles/withStyles';
import {Container} from "./container"
import {AppBar, IconButton, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import {Link, Redirect} from "react-router-dom";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


const styles = (theme: any) => ({
    root: {
        display: 'flex',
    },
    bar: {
        marginBottom: '10px',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textDecoration: 'none',
        color: 'white',
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
    auth?: any;
    firestore?: any;
    firebase?: any;
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
        const {links} = this.props;

        return (
            <Container>
                <ClickAwayListener onClickAway={this.MenuClose}>
                    <div className={classes.root}>
                        <Menu open={this.state.open}>

                            {
                                !!links && (
                                    <>
                                        {
                                            links.map(navLink => (
                                                <MenuItem key={navLink.title + navLink.to} onClick={this.MenuClose}>
                                                    {
                                                        navLink.to ?
                                                            <Link
                                                                to={navLink.to}
                                                                color="inherit"
                                                                style={{textDecoration: 'none'}}>
                                                                <Typography>{navLink.title}</Typography>
                                                            </Link>
                                                            :
                                                            <a
                                                                style={{textDecoration: 'none'}}
                                                                href="/"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    navLink.onClick!!();
                                                                }}
                                                            >
                                                                <Typography>{navLink.title}</Typography>
                                                            </a>
                                                    }
                                                </MenuItem>
                                            ))}
                                    </>
                                )
                            }
                        </Menu>
                        <AppBar position="static" className={classes.bar}>
                            <Toolbar>
                                <IconButton onClick={this.MenuOpen} edge="start" className={classes.menuButton}
                                            color="inherit" aria-label="menu">
                                    <MenuIcon/>
                                </IconButton>
                                <Link to="/" className={classes.title}>
                                    <Typography variant="h6" color="inherit">
                                        Shit Counter
                                    </Typography>
                                </Link>
                                {
                                    isEmpty(this.props.auth) ? (
                                            <Button color="inherit"
                                                    onClick={
                                                        () => this.props.firebase.login({provider: 'google', type: 'popup'})
                                                    }
                                            >Login
                                            </Button>
                                        ) :
                                        (
                                            <>
                                                <Button color="inherit"
                                                        onClick={() => this.props.firebase.logout()}>Logout</Button>
                                                <Redirect to='/'/>
                                            </>
                                        )
                                }
                            </Toolbar>
                        </AppBar>
                    </div>
                </ClickAwayListener>
            </Container>
        )
    }

    private MenuOpen = () => {
        this.setState({open: true});
    };

    private MenuClose = () => {
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
