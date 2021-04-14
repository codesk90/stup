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

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
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

export const deleteStudent = createAsyncThunk(
  'students/deletStudent',
  async (id, { rejectWithValue }) => {
    try {
      const { status } = await axios.delete(`${url}/students/${id}`);

      if (status === 200) return id;
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
  studentList: [],
  currentStudent: null,
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
    filterStudentList: (state, { payload }) => {
      state.filtered = state.studentList.filter((student) => {
        const regex = new RegExp(`${payload}`, `gi`);
        return (
          student.first_name.match(regex) ||
          student.last_name.match(regex) ||
          student.school.match(regex) ||
          student.grade.toString().match(regex) ||
          student.level.match(regex)
        );
      });
    },
    clearFilter: (state, { payload }) => {
      state.filtered = null;
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
    [updateStudent.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.studentList = state.studentList.map((student) => {
          if (student.id === payload.id) {
            return payload;
          }
          return student;
        });
        state.isLoading = 'idle';
        state.currentRequestId = '';
      }
    },
    [updateStudent.pending]: (state, { meta }) => {
      state.currentRequestId = meta;
      state.isLoading = 'pending';
    },
    [updateStudent.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta;
        state.isLoading = 'idle';
        state.error = error;
      }
    },
    [deleteStudent.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.filtered = null;
        state.studentList = state.studentList.filter(
          ({ id }) => id !== payload
        );
        state.isLoading = 'idle';
        state.currentRequestId = '';
      }
    },
    [deleteStudent.pending]: (state, { meta }) => {
      state.currentRequestId = meta;
      state.isLoading = 'pending';
    },
    [deleteStudent.rejected]: (state, { meta, payload, error }) => {
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

export const { filterStudentList, clearFilter } = studentSlice.actions;

export default studentSlice.reducer;
