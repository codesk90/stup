import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/home/Home';
import Students from '../pages/students/Students';
import Teachers from '../pages/teachers/Teachers';

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/teachers" component={Teachers} />
      <Route exact path="/students" component={Students} />
    </Switch>
  );
};

export default AppRouter;
