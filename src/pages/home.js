import React from 'react';
import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
import { Header } from '../components/header';
import { Banner } from '../components/banner';
import { Experiences } from "../components/experiences";


import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));



export default function HomePage() {
    const classes = useStyles();


    return (
        // <div className={classes.root}>
        <React.Fragment>
            <Header />
            <Banner />
            <Experiences />
        </React.Fragment>
    );
}
