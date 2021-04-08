import PropTypes from 'prop-types';
import { Box, Grid, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { addStudent } from '../../../features/student/studentSlice';

const StudentForm = ({ student, history, edit = false, setSaveOn = null }) => {
  const dispatch = useDispatch();
  const [studentInfo, setStudentInfo] = useState({ ...student });

  const handleForm = (input) => (e) => {
    setStudentInfo({
      ...studentInfo,
      [input]: e.target.value,
    });
  };

  const handleAddress = (input) => (e) => {
    if (input === 'state') {
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

  const compareObj = () => {
    if (edit && setSaveOn) {
      const key1 = Object.keys(studentInfo);
      const key2 = Object.keys(student);

      if (key1.length !== key2.length) {
        return false;
      }

      for (let key of key1) {
        if (studentInfo[key] !== student[key]) {
          return false;
        }
      }

      return true;
    }
    return false;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      const resultAction = !edit
        ? dispatch(addStudent(studentInfo))
        : console.log('here');
      unwrapResult(resultAction);
      // history.push('/students');
    } catch (error) {
      console.error('Failed to save the student: ', error);
    }
  };

  useEffect(() => {
    if (edit && setSaveOn) {
      setSaveOn(compareObj());
    }
    // eslint-disable-next-line
  }, [student]);

  const phoneRegEx = '[0-9]{3}-[0-9]{3}-[0-9]{4}';
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
      maxLength: 2,
    },
    {
      id: 'level',
      label: 'Level',
      grid: 2,
      require: false,
      maxLength: 2,
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
      maxLength: 5,
    },
  ];

  return (
    <form id="student-form" onSubmit={onSubmit}>
      <Box p={2}>
        <Grid container spacing={2}>
          {formList.map((item, index) => {
            return (
              <Grid item xs={item.grid} key={index}>
                <TextField
                  id={item.id}
                  fullWidth
                  label={item.label}
                  variant="outlined"
                  required={item.require}
                  inputProps={{
                    maxLength: item.maxLength,
                  }}
                  value={
                    item.address
                      ? studentInfo.address[item.id]
                      : studentInfo[item.id]
                  }
                  onChange={
                    !item.address ? handleForm(item.id) : handleAddress(item.id)
                  }
                />
              </Grid>
            );
          })}
          <Grid item xs={6}>
            <TextField
              id={'phone_number1'}
              fullWidth
              type="tel"
              label={'Mobile Phone'}
              variant="outlined"
              inputProps={{ pattern: phoneRegEx, maxLength: 12 }}
              required
              value={studentInfo.phone_number1}
              onChange={handleForm('phone_number1')}
              helperText="Format: 123-456-7890"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id={'phone_number2'}
              fullWidth
              type="tel"
              label={'Home Phone'}
              variant="outlined"
              value={studentInfo.phone_number2}
              inputProps={{ pattern: phoneRegEx, maxLength: 12 }}
              helperText="Format: 123-456-7890"
              onChange={handleForm('phone_number2')}
            />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

StudentForm.propTypes = {
  student: PropTypes.object,
  setSaveOn: PropTypes.func,
};

export default StudentForm;
