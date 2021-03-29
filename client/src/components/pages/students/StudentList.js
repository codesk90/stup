import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const StudentList = ({ students }) => {
  return (
    <Grid>
      <div>students</div>
      {students.map((student) => (
        <Grid key={student.id}>{student.name}</Grid>
      ))}
    </Grid>
  );
};

StudentList.propTypes = {
  students: PropTypes.array.isRequired,
};

export default StudentList;
