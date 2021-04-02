import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import { GetStudents } from '../../../services';
import StudentList from './StudentList';

const Students = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // setTimeout for test purpose
    setTimeout(() => {
      dispatch(GetStudents());
    }, 1000);
    // eslint-disable-next-line
  }, []);

  const { students, loading } = useSelector((state) => state.student);

  return (
    <Grid container spacing={2}>
      {students.length !== 0 && !loading ? (
        <StudentList />
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
};

export default Students;
