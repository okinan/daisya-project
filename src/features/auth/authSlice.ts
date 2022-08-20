import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    uid: "",
    userName: "",
    comName: "",
    admin: false,
  },
  reducers: {
    setUid: (state, action:PayloadAction<string>) => {
      state.uid = action.payload;
    },
    setAdmin: (state, action:PayloadAction<boolean>) => {
      state.admin = action.payload;
    },
    setUserName: (state, action:PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setComName: (state, action:PayloadAction<string>) => {
      state.comName = action.payload;
    },
  },
});

export const { setUid, setAdmin, setUserName, setComName } = authSlice.actions;

export const selectUid = (state: RootState) => state.auth.uid;
export const selectAdmin = (state: RootState) => state.auth.admin;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectComName = (state: RootState) => state.auth.comName;

export default authSlice.reducer;
