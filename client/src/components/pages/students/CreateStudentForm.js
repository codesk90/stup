import PropTypes from 'prop-types';
import { Box, Grid, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';

const CreateStudentForm = ({ onSubmit, handleForm, handleAddress }) => {
  const { stateList } = useSelector((state) => state.student);

  const formList = [
    {
      id: 'first_name',
      label: 'First Name',
      grid: 4,
      require: true,
    },
    {
      id: 'last_name',
      label: 'Last Name',
      grid: 4,
      require: true,
    },
    {
      id: 'grade',
      label: 'Grade',
      grid: 2,
      require: true,
    },
    {
      id: 'level',
      label: 'Level',
      grid: 2,
      require: true,
    },
    {
      id: 'parent_name',
      label: `Parent's Name`,
      grid: 12,
      require: true,
    },
    {
      id: 'email1',
      label: 'Primary Email',
      grid: 6,
      require: true,
    },
    {
      id: 'email2',
      label: 'Secondary Email',
      grid: 6,
    },
    {
      id: 'school',
      label: 'School Name',
      grid: 12,
      require: true,
    },
    {
      id: 'street1',
      label: 'Address Street',
      grid: 12,
      address: true,
      require: true,
    },
    {
      id: 'street2',
      label: 'Address Street 2',
      grid: 12,
      address: true,
    },
    {
      id: 'city',
      label: 'City',
      grid: 4,
      address: true,
      require: true,
    },
    {
      id: 'state',
      label: 'State',
      grid: 4,
      address: true,
      require: true,
    },
    {
      id: 'zipcode',
      label: 'Zipcode',
      grid: 4,
      address: true,
      require: true,
    },
    {
      id: 'phone_number1',
      label: 'Mobile Number',
      grid: 6,
      require: true,
    },
    {
      id: 'phone_number2',
      label: 'Telephone Number',
      grid: 6,
    },
  ];

  return (
    <form id="student-form" onSubmit={onSubmit}>
      <Box p={2}>
        <Grid container spacing={2}>
          {formList.map((item, index) => {
            return (
              <Grid item xs={item.grid} key={index}>
                {!item.autoComplete ? (
                  <TextField
                    id={item.id}
                    fullWidth
                    label={item.label}
                    variant="outlined"
                    // required={item.require}
                    onChange={
                      !item.address
                        ? handleForm(item.id)
                        : handleAddress(item.id)
                    }
                  />
                ) : (
                  //
                  <Autocomplete
                    id={item.id}
                    options={stateList}
                    autoHighlight
                    getOptionLabel={(option) => option.name}
                    renderOption={(option) => (
                      <Fragment>{option.name}</Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={item.label}
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                        }}
                      />
                    )}
                    onChange={handleAddress(item.id)}
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </form>
  );
};

CreateStudentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleForm: PropTypes.func.isRequired,
  handleAddress: PropTypes.func.isRequired,
};

export default CreateStudentForm;
