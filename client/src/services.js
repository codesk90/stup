// import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const GetStudents = createAsyncThunk(
  'students/getStudents',
  async () => {
    // dummy json data
    const data = require('./student.json');

    // format to call backend data
    // const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);

    return data;
  }
);

export const GetStates = createAsyncThunk('students/getStates', async () => {
  const data = require('./state.json');

  return data;
});
