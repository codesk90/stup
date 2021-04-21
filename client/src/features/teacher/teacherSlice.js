import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const url = 'http://localhost:3001';

export const fetchTeacherList = createAsyncThunk(
  'teachers/fetchTeacherList',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}/teachers`);

      return data;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const fetchTeacherById = createAsyncThunk(
  'teachers/fetchTeacherById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}/teachers/${id}`);

      return data;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const initialState = {
  teacherList: [],
  currentTeacher: null,
  isLoading: 'idle',
  currentRequestId: '',
  error: false,
  filtered: null,
};

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    filterTeacherList: (state, { payload }) => {
      state.filtered = state.teacherList.filter((teacher) => {
        const regex = new RegExp(`${payload}`, `gi`);
        return (
          teacher.first_name.match(regex) || teacher.last_name.match(regex)
        );
      });
    },
    clearFilter: (state, { payload }) => {
      state.filtered = null;
    },
  },
  extraReducers: {
    [fetchTeacherList.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.teacherList = payload;
        state.isLoading = 'idle';
        state.currentRequestId = '';
      }
    },
    [fetchTeacherList.pending]: (state, { meta }) => {
      state.currentRequestId = meta;
      state.isLoading = 'pending';
    },
    [fetchTeacherList.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta;
        state.isLoading = 'idle';
        state.teacherList = payload;
        state.error = error;
      }
    },
    [fetchTeacherById.fulfilled]: (state, { meta, payload }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentTeacher = payload;
        state.isLoading = 'idle';
        state.currentRequestId = '';
      }
    },
    [fetchTeacherById.pending]: (state, { meta }) => {
      state.currentRequestId = meta;
      state.isLoading = 'pending';
    },
    [fetchTeacherById.rejected]: (state, { meta, payload, error }) => {
      if (meta.requestId === state.currentRequestId.requestId) {
        state.currentRequestId = meta;
        state.isLoading = 'idle';
        state.currentTeacher = payload;
        state.error = error;
      }
    },
  },
});

export const { filterTeacherList, clearFilter } = teacherSlice.actions;

export default teacherSlice.reducer;
