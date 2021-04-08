import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const url = 'http://localhost:3001';

// We have to test error message
export const fetchStudentList = createAsyncThunk(
  'students/fetchStudentList',
  async (_, { rejectWithValue }) => {
    // using json-server for data fetch
    try {
      const { data } = await axios.get(`${url}/students`);

      return data;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const fetchCurrentStudentById = createAsyncThunk(
  'students/fetchCurrentStudentById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}/students/${id}`);

      return data;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (studentInfo, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${url}/students`, studentInfo);

      return data;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const getStateList = createAsyncThunk(
  'students/getStateList',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}/states`);

      return data;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const initialState = {
  currentStudent: null,
  studentList: [],
  stateList: [],
  isLoading: 'idle',
  currentRequestId: '',
  error: false,
  filtered: null,
};

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    filterStudentList: (state, action) => {
      console.log('filter Students');
    },
    clearCurrentStudent: (state, action) => {
      state.currentStudent = null;
    },
  },
  extraReducers: {
    [fetchStudentList.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.studentList = payload;
        state.isLoading = 'idle';
        state.currentRequestId = '';
      }
    },
    [fetchStudentList.pending]: (state, { meta }) => {
      state.currentRequestId = meta;
      state.isLoading = 'pending';
    },
    [fetchStudentList.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta;
        state.isLoading = 'idle';
        state.studentList = payload;
        state.error = error;
      }
    },
    [fetchCurrentStudentById.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentStudent = payload;
        state.isLoading = 'idle';
        state.currentRequestId = '';
      }
    },
    [fetchCurrentStudentById.pending]: (state, { meta }) => {
      state.currentRequestId = meta;
      state.isLoading = 'pending';
    },
    [fetchCurrentStudentById.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta;
        state.isLoading = 'idle';
        state.currentStudent = payload;
        state.error = error;
      }
    },
    [addStudent.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.studentList.push(payload);
        state.isLoading = 'idle';
      }
    },
    [addStudent.pending]: (state, { meta }) => {
      state.currentRequestId = meta;
      state.isLoading = 'pending';
    },
    [addStudent.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta;
        state.isLoading = 'idle';
        state.studentList.push(payload);
        state.error = error;
      }
    },
    [getStateList.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.stateList = payload;
        state.isLoading = 'idle';
        state.currentRequestId = '';
      }
    },
    [getStateList.pending]: (state, { meta }) => {
      state.currentRequestId = meta;
      state.isLoading = 'pending';
    },
  },
});

export const { filterStudentList, clearCurrentStudent } = studentSlice.actions;

export default studentSlice.reducer;
