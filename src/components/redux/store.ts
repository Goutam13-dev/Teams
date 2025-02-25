import { configureStore } from "@reduxjs/toolkit";
import zivahireSlice from './slice/zivahireSlice'
import zivahireServices from './service/zivahireServices'

export const store = configureStore({
  reducer: {
    counter: zivahireSlice, 
    [zivahireServices.reducerPath]: zivahireServices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(zivahireServices.middleware),
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;