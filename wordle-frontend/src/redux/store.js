// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import roomOwnerReducer from './slice/roomOwnerSlice';

const store = configureStore({
  reducer: {
    roomOwner: roomOwnerReducer,
  },
});

export default store;
