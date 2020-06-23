import React from 'react';
import logo from './logo.svg';
import './App.css';

import { white, orange, blue } from '@material-ui/core/colors';

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import {
  CssBaseline
} from '@material-ui/core';

import HomePage from './pages/home';

const theme = createMuiTheme({
  palette: {
    background:{
      default: '#ffffff',
    },
    primary: {
      main: '#101935'
    }, 
    secondary: {
      main: '#4F7CAC',
    },
    text: {
      secondary: "#000000",
      hint: "#eeeeee"
    }
  },
  status: {
    danger: orange[500],
  },
});

theme.typography.h1 = {
  fontSize: '1.8rem',
  '@media (min-width:600px)': {
    fontSize: '2.4rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
};

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

function App() {

  // const classes = useStyles();

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomePage />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;