import React from 'react';
import PropTypes from 'prop-types';
import { Edit as EditIcon } from '@material-ui/icons';
import { TableRow, TableCell, IconButton } from '@material-ui/core';

const schoolName = (school, grade) => {
  if (grade > 8) return `${school} High School`;
  if (grade > 5) return `${school} Middle School`;
  return `${school} Elementary School`;
};

const StudentListItem = ({ student }) => {
  return (
    <TableRow hover key={student.id} tabIndex={-1}>
      <TableCell component="th" scope="row">
        {`${student.first_name} ${student.last_name}`}
      </TableCell>
      <TableCell align="left">{student.email1}</TableCell>
      <TableCell align="left">
        {schoolName(student.school, student.grade)}
      </TableCell>
      <TableCell align="right">{student.grade}</TableCell>
      <TableCell align="right">{student.phone_number1}</TableCell>
      <TableCell align="right">
        <IconButton onClick={() => console.log('Edit')}>
          <EditIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

StudentListItem.propTypes = {
  student: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default StudentListItem;
