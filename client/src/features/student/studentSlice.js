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

export const fetchStudentById = createAsyncThunk(
  'students/fetchStudentById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}/students/${id}`);

      return data;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const updateStudentById = createAsyncThunk(
  'students/updateStudentById',
  async (studentInfo, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${url}/students/${studentInfo.id}`,
        studentInfo
      );

      return data;
    } catch (err) {
      console.log(rejectWithValue(err.response.data));
      return rejectWithValue(err.response.data);
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
      state.currentStudent = null;
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
    [fetchStudentById.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentStudent = payload;
        state.isLoading = 'idle';
        state.currentRequestId = '';
      }
    },
    [fetchStudentById.pending]: (state, { meta }) => {
      state.currentRequestId = meta;
      state.isLoading = 'pending';
    },
    [fetchStudentById.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta;
        state.isLoading = 'idle';
        state.currentStudent = payload;
        state.error = error;
      }
    },
    [updateStudentById.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentStudent = payload;
        state.isLoading = 'idle';
        state.currentRequestId = '';
      }
    },
    [updateStudentById.pending]: (state, { meta }) => {
      state.currentRequestId = meta;
      state.isLoading = 'pending';
    },
    [updateStudentById.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta;
        state.isLoading = 'idle';
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
