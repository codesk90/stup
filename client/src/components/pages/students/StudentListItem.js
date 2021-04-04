import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, makeStyles } from '@material-ui/core';

const schoolName = (school, grade) => {
  if (grade > 8) return `${school} High School`;
  if (grade > 5) return `${school} Middle School`;
  return `${school} Elementary School`;
};

const useStyles = makeStyles((theme) => ({
  hover: {
    cursor: 'pointer',
  },
}));

const StudentListItem = ({ student }) => {
  const classes = useStyles();
  return (
    <TableRow
      hover
      key={student.id}
      tabIndex={-1}
      className={classes.hover}
      onClick={() => console.log('selected row')}
    >
      <TableCell component="th" scope="row">
        {`${student.first_name} ${student.last_name}`}
      </TableCell>
      <TableCell align="left">{student.email1}</TableCell>
      <TableCell align="left">
        {schoolName(student.school, student.grade)}
      </TableCell>
      <TableCell align="right">{student.grade}</TableCell>
      <TableCell align="right">{student.level}</TableCell>
      <TableCell align="right">{student.phone_number1}</TableCell>
    </TableRow>
  );
};

StudentListItem.propTypes = {
  student: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default StudentListItem;
