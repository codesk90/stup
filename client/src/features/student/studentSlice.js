import { createSlice } from '@reduxjs/toolkit';
import { GetStudents } from '../../services';

export const initialState = {
  students: [],
  loading: true,
  error: false,
};

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: {
    [GetStudents.fulfilled]: (state, action) => {
      state.students = action.payload;
      state.loading = false;
    },
    [GetStudents.rejected]: (state, action) => {
      state.students = [];
      state.loading = false;
    },
  },
});

// eslint-disable-next-line
export const {} = studentSlice.actions;

export default studentSlice.reducer;
