import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    subRoot: {
        [theme.breakpoints.down("xs")]: {
            marginRight: 3,
            marginLeft: 3,
        },
    },
}));

export default function BodyContainer({ children }) {
    const classes = useStyles();

    return <Grid container item>
        <Grid item xs={'auto'} sm={2}></Grid>
        <Grid container item xs={12} sm={8} spacing={2} className={classes.subRoot}>
            {children}
        </Grid>
        <Grid item xs={'auto'} sm={2}></Grid>
    </Grid>
}