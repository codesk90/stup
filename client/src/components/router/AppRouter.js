import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/home/Home';
import Students from '../pages/students/Students';

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/students' component={Students} />
    </Switch>
  );
};

export default AppRouter;
