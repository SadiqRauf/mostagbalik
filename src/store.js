import {configureStore} from '@reduxjs/toolkit';
import userSlice from './reducers/auth';
export default configureStore({
  reducer: {
    user: userSlice,
  },
});
