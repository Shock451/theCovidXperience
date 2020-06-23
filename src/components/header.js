import React from 'react';

import './header.css';
import Logo from '../logo.png';

import {
    AppBar,
    Toolbar,
    IconButton,
    Grid
} from '@material-ui/core';

import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';

export const Header = () => {
    return (
        <AppBar position="static" elevation={1} color=''>
            <Toolbar>
                <Grid
                    justify="space-between" 
                    container
                    spacing={24}
                >
                    <Grid item>
                        <img src={Logo} height={40} alt='covid-experience-logo' />
                    </Grid>
                    {/* <Grid item>
                        <IconButton size={12} color="primary" aria-label="Share your experience" component="span">
                            <ShareOutlinedIcon />
                        </IconButton>
                    </Grid> */}
                </Grid>
            </Toolbar>
        </AppBar>
    );
}