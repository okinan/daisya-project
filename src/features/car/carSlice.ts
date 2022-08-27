import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type carDataType = {
  carComDay: string
  carName: string
  carNum: string
  deadLine?: string
  id: string
  registerDate: object
  registerUid: string
  updateDate: object
  updateUid: string
}[]

type carType = {
  syakenCar: carDataType
  allCar: carDataType
  syakenDaisu: number
}

const initialState: carType = {
  syakenCar: [],
  allCar: [],
  syakenDaisu: 0,
}

export const carSlice = createSlice({
  name: 'car',
  initialState: initialState,
  reducers: {
    setSyakenCar: (state, action:PayloadAction<carDataType>) => {
      state.syakenCar = action.payload;
    },
    setAllCar: (state, action:PayloadAction<carDataType>) => {
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
