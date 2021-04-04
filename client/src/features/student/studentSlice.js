import { createSlice } from '@reduxjs/toolkit';
import { GetStates, GetStudents } from '../../services';

export const initialState = {
  students: [],
  stateList: [],
  isLoading: false,
  error: false,
};

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    handleLoading: (state, action) => {
      state.isLoading = true;
    },
  },
  extraReducers: {
    [GetStudents.fulfilled]: (state, action) => {
      state.students = action.payload;
      state.isLoading = false;
    },
    [GetStudents.rejected]: (state, action) => {
      state.students = [];
      state.isLoading = false;
    },
    [GetStates.fulfilled]: (state, action) => {
      state.stateList = action.payload;
      state.isLoading = false;
    },
  },
});

// eslint-disable-next-line
export const { handleLoading } = studentSlice.actions;

export default studentSlice.reducer;
