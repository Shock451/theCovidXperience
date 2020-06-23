import React from 'react';
import './header.css';
import Logo from '../logo.svg';
import { colors, Typography, Paper } from '@material-ui/core';
import { Container } from '@material-ui/core';

import { grey } from '@material-ui/core/colors';

import './banner.css';

import Particles from 'react-particles-js';
import particlesjs_config from './particlesjs-config.json';

export const Banner = (props) => {
    return (
        <Paper>
            <div className="wrapper">
                <Particles
                    params={particlesjs_config}
                    // width="100vw"
                    height="80vh"
                />
                <div className="text">
                    <Typography variant="h1" className="lead-text">Stay Home. Stay safe</Typography>
                    <Typography variant="subtitle2" className="text-light-grey">Share your experience with the world.</Typography>
                </div>
            </div>
        </Paper>
    );
}