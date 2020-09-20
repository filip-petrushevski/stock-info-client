import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 5,
    },
    media: {
        height: 140,
    },
}));

export default function ArticleCard(props) {
    const classes = useStyles();

    return (<Grid item xs={12} sm={6} >
        <Card>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.urlToImage}
                />
                <CardContent>
                    <Typography className={classes.pos} color="textSecondary">
                        {props.author}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" href={props.url}>Read More</Button>
            </CardActions>
        </Card>
    </Grid>)
}