import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, Grid } from '@material-ui/core';
import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import { Header } from './components/layout/Header';
import { Navbar } from './components/layout/Navbar';
import AppRouter from './components/router/AppRouter';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const THEME = createMuiTheme({
  typography: {
    fontFamily: `'Work Sans', sans-serif`,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const classes = useStyles();
  return (
    <MuiThemeProvider theme={THEME}>
      <Router>
        <CssBaseline />
        <Grid container className={classes.appBar}>
          <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          <Grid item xs={12} className={classes.content}>
            <AppRouter />
          </Grid>
        </Grid>
        <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
