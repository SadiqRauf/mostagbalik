import {createSlice} from '@reduxjs/toolkit';
export const initialState = {
  userData: {},
  init_Data: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.userData = action.payload;
      console.log('yesss...', action.payload);
    },
    getInitData: (state, action) => {
      state.init_Data = action.payload;
    },
    logOut: (state, action) => {
      state.init_Data = {};
      state.userData = {};
    },
  },
});
export const {logOut, getInitData, getUser} = userSlice.actions;
export default userSlice.reducer;
