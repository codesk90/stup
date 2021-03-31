import React from 'react';
import Calendar from './Calendar';
import { Grid, Paper, Box } from '@material-ui/core';

const Home = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={9}>
        <Paper>
          <Box p={2}>
            <Calendar />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper>
          <Box p={2}>Hello</Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;
