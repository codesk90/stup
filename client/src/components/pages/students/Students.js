import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import { GetStates, GetStudents } from '../../../services';
import StudentList from './StudentList';
import { handleLoading } from '../../../features/student/studentSlice';

const Students = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // setTimeout for test purpose
    dispatch(handleLoading());
    setTimeout(() => {
      dispatch(GetStudents());
    }, 1000);
    // eslint-disable-next-line
  }, [dispatch]);

  const { students, isLoading } = useSelector((state) => state.student);

  return (
    <Grid container spacing={2}>
      {students.length !== 0 && !isLoading ? (
        <StudentList />
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
};

export default Students;
