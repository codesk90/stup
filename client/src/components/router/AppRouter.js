import { Grid } from '@material-ui/core';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/home/Home';
import Students from '../pages/students/Students';
import Teachers from '../pages/teachers/Teachers';

const AppRouter = () => {
  return (
    <Grid container spacing={2}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/teachers' component={Teachers} />
        <Route exact path='/students' component={Students} />
      </Switch>
    </Grid>
  );
};

export default AppRouter;
