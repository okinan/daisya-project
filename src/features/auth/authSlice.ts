import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    uid: "testUid"
  },
  reducers: {
    setUid: (state, action:PayloadAction<string>) => {
      state.uid = action.payload;
    }
  },
});

export const { setUid } = authSlice.actions;
export const selectUid = (state: RootState) => state.auth.uid;
export default authSlice.reducer;
