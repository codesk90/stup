import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const GetStudents = createAsyncThunk(
  'students/getStudents',
  async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);

    return res.data;
  }
);
