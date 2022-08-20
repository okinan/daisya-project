import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    alert1: false,
    alert2: false,
    alert3: false,
    alert4: false,
    alert5: false,
    docId: "",
  },
  reducers: {
    setAlert1: (state, action:PayloadAction<boolean>) => {
      state.alert1 = action.payload;
    },
    setAlert2: (state, action:PayloadAction<boolean>) => {
      state.alert2 = action.payload;
    },
    setAlert3: (state, action:PayloadAction<boolean>) => {
      state.alert3 = action.payload;
    },
    setAlert4: (state, action:PayloadAction<boolean>) => {
      state.alert4 = action.payload;
    },
    setAlert5: (state, action:PayloadAction<boolean>) => {
      state.alert5 = action.payload;
    },
    setDocId: (state, action:PayloadAction<string>) => {
      state.docId = action.payload;
    },
  },
});

export const { setAlert1, setAlert2, setAlert3, setAlert4, setAlert5, setDocId } = alertSlice.actions;

export const selectAlert1 = (state: RootState) => state.alert.alert1;
export const selectAlert2 = (state: RootState) => state.alert.alert2;
export const selectAlert3 = (state: RootState) => state.alert.alert3;
export const selectAlert4 = (state: RootState) => state.alert.alert4;
export const selectAlert5 = (state: RootState) => state.alert.alert5;
export const selectDocId = (state: RootState) => state.alert.docId;

export default alertSlice.reducer;
