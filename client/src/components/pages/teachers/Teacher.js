import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
// import StudentForm from './StudentForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeacherById } from '../../../features/teacher/teacherSlice';
import TeacherForm from './TeacherForm';

const currentWindowHeight = window.innerHeight - 202;

const Teacher = ({ match }) => {
  const dispatch = useDispatch();
  const { isLoading, currentTeacher } = useSelector((state) => state.teacher);
  const [paperHeight, setPaperHeight] = useState(currentWindowHeight);
  const [saveOn, setSaveOn] = useState(true);
  const handleResize = () => {
    setPaperHeight(window.innerHeight - 202);
  };

  useEffect(() => {
    dispatch(fetchTeacherById(match.params.id));
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
              <Box flexGrow={1}>
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
          {currentTeacher && isLoading === 'idle' ? (
            <TeacherForm
              teacher={currentTeacher}
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
          Assigned Students
        </Paper>
      </Grid>
    </Grid>
  );
};

Teacher.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Teacher;
