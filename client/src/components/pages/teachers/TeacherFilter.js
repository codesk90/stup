import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  filterTeacherList,
  clearFilter,
} from '../../../features/teacher/teacherSlice';

const TeacherFilter = () => {
  const dispatch = useDispatch();
  const text = useRef('');

  const filterSearch = (e) => {
    if (text.current.value !== '') {
      dispatch(filterTeacherList(e.target.value));
    } else {
      dispatch(clearFilter());
    }
  };

  return (
    <Box flexGrow={1} mx={3}>
      <TextField
        variant="outlined"
        placeholder="Filter Student..."
        fullWidth
        inputRef={text}
        margin="dense"
        onChange={filterSearch}
        style={{ margin: 0 }}
      />
    </Box>
  );
};

export default TeacherFilter;
