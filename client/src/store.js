import { configureStore } from '@reduxjs/toolkit';
import studentSlice from './features/student/studentSlice';
export default configureStore({
  reducer: {
    student: studentSlice,
  },
});
