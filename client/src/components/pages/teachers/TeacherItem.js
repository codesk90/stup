import PropTypes from 'prop-types';
import { TableRow, TableCell, makeStyles } from '@material-ui/core';
import { withRouter } from 'react-router';

const useStyles = makeStyles((theme) => ({
  hover: {
    cursor: 'pointer',
  },
}));

const TeacherItem = ({ teacher, match, history }) => {
  const handleSelectedTeacher = () => {
    history.push({
      pathname: `${match.url}/${teacher.id}`,
      state: { data: teacher },
    });
  };

  const classes = useStyles();
  return (
    <TableRow
      hover
      key={teacher.id}
      tabIndex={-1}
      className={classes.hover}
      onClick={handleSelectedTeacher}
    >
      <TableCell component="th" scope="row">
        {`${teacher.first_name} ${teacher.last_name}`}
      </TableCell>
      <TableCell align="left">{teacher.username}</TableCell>
      <TableCell align="left">{teacher.email}</TableCell>
      <TableCell align="right">{teacher.phone_number1}</TableCell>
    </TableRow>
  );
};

TeacherItem.propTypes = {
  teacher: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default withRouter(TeacherItem);
