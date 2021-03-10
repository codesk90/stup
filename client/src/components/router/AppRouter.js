import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/dashboard/Dashboard';
import Students from '../pages/students/Students';

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path='/' component={Dashboard} />
      <Route exact path='/students' component={Students} />
    </Switch>
  );
};

export default AppRouter;
