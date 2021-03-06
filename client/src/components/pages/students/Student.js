import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import StudentForm from './StudentForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentById } from '../../../features/student/studentSlice';

const currentWindowHeight = window.innerHeight - 202;

const Student = ({ match }) => {
  const dispatch = useDispatch();
  const { isLoading, currentStudent } = useSelector((state) => state.student);
  const [paperHeight, setPaperHeight] = useState(currentWindowHeight);
  const [saveOn, setSaveOn] = useState(true);
  const handleResize = () => {
    setPaperHeight(window.innerHeight - 202);
  };

  useEffect(() => {
    dispatch(fetchStudentById(match.params.id));
    // Get States for Autocomplete
    // eslint-disable-next-line
    // dispatch(GetStateList());
  }, [dispatch, match]);

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
              <Box flexGrow={1}
                style={{
                  display: "flex"
                }}
              >
                <Button
                  type="button"
                  onClick={() => {
                    window.history.back();
                  }}
                >Back</Button>
                <Typography variant="h4">Edit Student</Typography>
              </Box>
              <Button
                disabled={saveOn}
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
        <Paper style={{ height: paperHeight, overflow: 'auto' }}>
          {currentStudent && isLoading === 'idle' ? (
            <StudentForm
              student={currentStudent}
              edit={true}
              setSaveOn={setSaveOn}
            />
          ) : (
            <CircularProgress />
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper style={{ height: paperHeight, overflowX: 'auto' }}>
          Assign Curriculum
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Student;
