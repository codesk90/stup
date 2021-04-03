import React from 'react';
import { Box, Grid, TextField } from '@material-ui/core';

const CreateStudentForm = () => {
  return (
    <form>
      <Box p={2}>
        <Grid container spacing={4}>
          <Grid item xs={5}>
            <TextField
              id="first-name"
              fullWidth
              label="First Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="first-name"
              fullWidth
              label="Last Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField fullWidth id="grade" label="Grade" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="parent-name"
              label="Parent's Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="email1"
              label="Primary Email"
              type="email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="email2"
              label="Secondary Email"
              type="email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="school"
              label="School Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="street1"
              label="Address Street 1"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="street2"
              label="Address Street 2"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              id="city"
              label="City"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              id="state"
              label="State"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              id="zipcode"
              label="Zipcode"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="phone1"
              label="Primary Number"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="phone2"
              label="Secondary Number"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default CreateStudentForm;
