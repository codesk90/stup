import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import CreateStudentForm from './CreateStudentForm';

const CreateStudent = () => {
  const currentWindowHeight = window.innerHeight - 193;
  const [paperHeight, setPaperHeight] = useState(currentWindowHeight);

  const handleResize = () => {
    setPaperHeight(window.innerHeight - 193);
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
            <Grid container alignItems='center'>
              <Grid item xs={7}>
                <Typography variant='h5'>Create New Student</Typography>
              </Grid>
              <Grid item xs={5}>
                Save
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <Paper style={{ height: paperHeight }}>
          <CreateStudentForm />
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper style={{ height: paperHeight }}>Profile</Paper>
      </Grid>
    </Grid>
  );
};

export default CreateStudent;
