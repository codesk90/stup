import React, { Fragment, useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import CreateStudentForm from './CreateStudentForm';
import { useDispatch, useSelector } from 'react-redux';
import { GetStates } from '../../../services';
import { handleLoading } from '../../../features/student/studentSlice';

const currentWindowHeight = window.innerHeight - 197;

const CreateStudent = () => {
  const dispatch = useDispatch();
  const [paperHeight, setPaperHeight] = useState(currentWindowHeight);

  const handleResize = () => {
    setPaperHeight(window.innerHeight - 197);
  };

  useEffect(() => {
    dispatch(handleLoading());
    dispatch(GetStates());
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [paperHeight]);

  const { isLoading } = useSelector((state) => state.student);

  const [studentInfo, setStudentInfo] = useState({
    first_name: '',
    last_name: '',
    parent_name: '',
    email1: '',
    email2: '',
    grade: +'',
    level: '',
    school: '',
    address: {
      street1: '',
      street2: '',
      city: '',
      state: '',
      zipcode: +'',
    },
    phone_number1: '',
    phone_number2: '',
  });

  const handleForm = (input) => (e) => {
    setStudentInfo({
      ...studentInfo,
      [input]: e.target.value,
    });
  };

  const handleAddress = (input) => (e) => {
    if (input === 'state') {
      console.log(e.target.innerText);
      setStudentInfo({
        ...studentInfo,
        address: { ...studentInfo.address, [input]: e.target.innerText },
      });
    }
    setStudentInfo({
      ...studentInfo,
      address: { ...studentInfo.address, [input]: e.target.value },
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(studentInfo);
  };

  return (
    <Grid container spacing={2}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Fragment>
          <Grid item xs={12}>
            <Paper>
              <Box p={2}>
                <Grid container alignItems="center">
                  <Box flexGrow={1}>
                    <Typography variant="h5">Create New Student</Typography>
                  </Box>
                  <Button
                    color="primary"
                    type="submit"
                    form="student-form"
                    variant="outlined"
                  >
                    Save
                  </Button>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper style={{ height: paperHeight }}>
              <CreateStudentForm
                handleForm={handleForm}
                onSubmit={onSubmit}
                handleAddress={handleAddress}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper style={{ height: paperHeight }}>Assign Curriculum</Paper>
          </Grid>
        </Fragment>
      )}
    </Grid>
  );
};

export default CreateStudent;
