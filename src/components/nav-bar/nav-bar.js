import { AppBar, Grid, Toolbar, Typography, makeStyles, Button, Tab, Tabs, Hidden } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import TimelineIcon from '@material-ui/icons/Timeline';
import React from 'react';
import AuthService from '../../services/auth-service/auth-service';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(2)
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    tabs: {
        flexGrow: 1,
        marginBottom: 0,
    },
    tab: {
        height: "64px"
    },
    authButton: {
        marginLeft: 20
    }
}));



function NavBar() {
    const classes = useStyles();
    const location = useLocation();
    const [value, setValue] = React.useState(location.pathname.toLowerCase() === "/news" ? 0 : false);
    const [user, setUser] = React.useState(AuthService.getCurrentUser());

    React.useEffect(() => {
        const path = window.location.pathname;
        if (path === "/news") {
            setValue(0);
        } else if (path === "/companies") {
            setValue(1);
        } else if (path === "/my-companies") {
            setValue(2);
        } else {
            setValue(false);
        }
    }, [])

    const handleChange = (e, val) => {
        setValue(val);
    }

    const logoutClicked = (e, val) => {
        AuthService.logout();
        setUser(null);
    }

    const authButtonClicked = (e, val) => {
        setValue(false);
    }

    return <Grid item className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <TimelineIcon fontSize="large" viewBox="0 0 26 25"></TimelineIcon>
                <Typography variant="h6">
                    StockInfo
                </Typography>
                <Tabs
                    selectionFollowsFocus
                    className={classes.tabs}
                    value={value}
                    onChange={handleChange}>
                    <Tab label="News" component={Link} to="/news" className={classes.tab} />
                    {
                        user && <Tab label="All Companies" component={Link} to="/companies" />
                    }
                    {
                        user && <Tab label="My Companies" component={Link} to="/my-companies" />
                    }
                </Tabs>
                {
                    user ? <> <Hidden smDown><Typography variant="subtitle1">Hello {user.username}</Typography></Hidden>
                        <Button onClick={logoutClicked} variant="outlined" className={classes.authButton} component={Link} to="/news" color="inherit">Logout</Button>
                    </> : <>
                            <Button onClick={authButtonClicked} variant="outlined" className={classes.authButton} component={Link} to="/register" color="inherit">Register</Button>
                            <Button onClick={authButtonClicked} variant="outlined" className={classes.authButton} component={Link} to="/login" color="inherit">Login</Button>
                        </>
                }
            </Toolbar>
        </AppBar>
    </Grid>
}

export default NavBar;