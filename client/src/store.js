import { configureStore } from '@reduxjs/toolkit';
import studentSlice from './features/student/studentSlice';
import teacherSlice from './features/teacher/teacherSlice';
export default configureStore({
  reducer: {
    student: studentSlice,
    teacher: teacherSlice,
  },
});
