import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
// import {
//   addStudent,
//   deleteStudent,
//   updateStudent,
// } from '../../../features/student/studentSlice';
import { formDataList } from './formDataList';
import { useHistory } from 'react-router';

const TeacherForm = ({ student, edit = false, setSaveOn = null }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [openDialog, setOpenDialog] = useState(false);
  const [studentInfo, setStudentInfo] = useState({ ...student });
  const [formList, setFormList] = useState(null);

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    setOpenDialog(false);
    // dispatch(deleteStudent(studentInfo.id));
    history.push('/students');
  };

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

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      // const resultAction = !edit
      //   ? dispatch(addStudent(studentInfo))
      //   : dispatch(updateStudent(studentInfo));
      // unwrapResult(resultAction);
      history.push('/students');
    } catch (error) {
      console.error('Failed to save the student: ', error);
    }
  };

  useEffect(() => {
    setFormList(formDataList);
  }, []);

  useEffect(() => {
    if (edit) {
      const compareObj = () => {
        if (edit) {
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

      setSaveOn(compareObj());
    }
  }, [studentInfo, student, edit, setSaveOn]);

  const phoneRegEx = '[0-9]{3}-[0-9]{3}-[0-9]{4}';

  return (
    <form id="student-form" onSubmit={onSubmit}>
      <Box p={2}>
        <Grid container spacing={2}>
          {formList &&
            formList.map((item, index) => {
              return (
                <Grid item xs={item.grid} key={index}>
                  <TextField
                    id={item.id}
                    fullWidth
                    label={item.label}
                    variant="outlined"
                    // required={item.require}
                    inputProps={{
                      maxLength: item.maxLength,
                    }}
                    value={
                      item.address
                        ? studentInfo.address[item.id]
                        : studentInfo[item.id]
                    }
                    onChange={
                      !item.address
                        ? handleForm(item.id)
                        : handleAddress(item.id)
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
          {edit && (
            <Grid item xs={12}>
              <Grid container justify="flex-end">
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={handleOpen}
                >
                  Delete
                </Button>
                <Dialog open={openDialog} onClose={handleClose}>
                  <DialogTitle>Confirm Delete</DialogTitle>
                  <DialogContent>
                    <DialogContentText>{`Do you want to delete ${studentInfo.first_name} ${studentInfo.last_name}?`}</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                      Disagree
                    </Button>
                    <Button onClick={handleDelete} color="primary">
                      Agree
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
    </form>
  );
};

TeacherForm.propTypes = {
  teacher: PropTypes.object,
  edit: PropTypes.bool,
  setSaveOn: PropTypes.func,
};

export default TeacherForm;
