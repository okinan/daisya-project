import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export const carSlice = createSlice({
  name: 'car',
  initialState: {
    syakenCar: [],
  },
  reducers: {
    setSyakenCar: (state, action:PayloadAction<any>) => {
      state.syakenCar = action.payload;
    },
  },
});

export const { setSyakenCar } = carSlice.actions;

export const selectSyakenCar = (state: RootState) => state.car.syakenCar;

export default carSlice.reducer;
