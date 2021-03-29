import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, CircularProgress, Grid, Paper } from '@material-ui/core';
import { GetStudents } from '../../../services';
import StudentList from './StudentList';

const Students = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetStudents());
    // eslint-disable-next-line
  }, []);

  const { students, loading } = useSelector((state) => state.student);

  return (
    <Grid item xs={12}>
      <Paper>
        <Box p={2}>
          {students.length !== 0 && !loading ? (
            <StudentList students={students} />
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Paper>
    </Grid>
  );
};

export default Students;
