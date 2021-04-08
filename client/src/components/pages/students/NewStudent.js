import { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import StudentForm from './StudentForm';

const currentWindowHeight = window.innerHeight - 202;

const NewStudent = () => {
  const [paperHeight, setPaperHeight] = useState(currentWindowHeight);
  const studentInfo = {
    first_name: '',
    last_name: '',
    parent_name: '',
    email1: '',
    email2: '',
    grade: '',
    level: '',
    school: '',
    address: {
      street1: '',
      street2: '',
      city: '',
      state: '',
      zipcode: '',
    },
    phone_number1: '',
    phone_number2: '',
  };

  const handleResize = () => {
    setPaperHeight(window.innerHeight - 202);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [paperHeight]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper>
          <Box p={2}>
            <Grid container alignItems="center">
              <Box flexGrow={1}>
                <Typography variant="h4">New Student</Typography>
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
          <StudentForm student={studentInfo} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper style={{ height: paperHeight }}>Assign Curriculum</Paper>
      </Grid>
    </Grid>
  );
};

export default NewStudent;
