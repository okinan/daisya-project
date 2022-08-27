import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import alertReducer from '../features/alert/alertSlice';
import carReducer from '../features/car/carSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    car: carReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
