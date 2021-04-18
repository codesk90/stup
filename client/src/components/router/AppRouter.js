import { Route, Switch } from 'react-router-dom';
import CurriculumList from '../pages/curriculums/CurriculumList';
import Home from '../pages/home/Home';
import Student from '../pages/students/Student';
import NewStudent from '../pages/students/NewStudent';
import StudentList from '../pages/students/StudentList';
import Teacher from '../pages/teachers/Teacher';
import TeacherList from '../pages/teachers/TeacherList';

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/teachers" component={TeacherList} />
      <Route path="/teachers/:id" component={Teacher} />
      {/* <Route exact path="/teachers/new" component={NewTeacher} /> */}
      <Route exact path="/students" component={StudentList} />
      <Route exact path="/students/new" component={NewStudent} />
      <Route path="/students/:id" component={Student} />
      <Route excat path="/curriculums" component={CurriculumList} />
    </Switch>
  );
};

export default AppRouter;
