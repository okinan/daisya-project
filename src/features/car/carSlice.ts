import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export const carSlice = createSlice({
  name: 'car',
  initialState: {
    syakenCar: [],
    allCar: [],
  },
  reducers: {
    setSyakenCar: (state, action:PayloadAction<any>) => {
      state.syakenCar = action.payload;
    },
    setAllCar: (state, action:PayloadAction<any>) => {
      state.allCar = action.payload;
    },
  },
});

export const { setSyakenCar, setAllCar } = carSlice.actions;

export const selectSyakenCar = (state: RootState) => state.car.syakenCar;
export const selectAllCar = (state: RootState) => state.car.allCar;

export default carSlice.reducer;
