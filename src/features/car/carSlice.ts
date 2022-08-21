import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export const carSlice = createSlice({
  name: 'car',
  initialState: {
    syakenCar: [],
    allCar: [],
    syakenDaisu: 0
  },
  reducers: {
    setSyakenCar: (state, action:PayloadAction<any>) => {
      state.syakenCar = action.payload;
    },
    setAllCar: (state, action:PayloadAction<any>) => {
      state.allCar = action.payload;
    },
    setSyakenDaisu: (state, action:PayloadAction<number>) => {
      state.syakenDaisu = action.payload;
    },
  },
});

export const { setSyakenCar, setAllCar, setSyakenDaisu } = carSlice.actions;

export const selectSyakenCar = (state: RootState) => state.car.syakenCar;
export const selectAllCar = (state: RootState) => state.car.allCar;
export const selectSyakenDaisu = (state: RootState) => state.car.syakenDaisu;

export default carSlice.reducer;
