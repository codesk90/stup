import { Route, Switch } from 'react-router-dom';
import Curriculums from '../pages/curriculums/Curriculums';
import Home from '../pages/home/Home';
import Student from '../pages/students/Student';
import NewStudent from '../pages/students/NewStudent';
import StudentList from '../pages/students/StudentList';
import Teachers from '../pages/teachers/Teachers';

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/teachers" component={Teachers} />
      <Route exact path="/students" component={StudentList} />
      <Route exact path="/students/new" component={NewStudent} />
      <Route path="/students/:id" component={Student} />
      <Route excat path="/curriculums" component={Curriculums} />
    </Switch>
  );
};

export default AppRouter;
