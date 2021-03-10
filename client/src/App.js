import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from './components/layout/Sidebar';
import AppRouter from './components/router/AppRouter';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Router>
        <div className={classes.root}>
          <Fragment>
            <Sidebar />
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <AppRouter />
            </main>
          </Fragment>
        </div>
      </Router>
    </Fragment>
  );
};

export default App;
