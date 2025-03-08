import { configureStore } from "@reduxjs/toolkit";
import zivahireSlice from './slice/zivahireSlice'
import zivahireServices from './service/zivahireServices'
import usersearchService from "./service/usersearchService";
import userpromptService from "./service/userpromptService";

export const store = configureStore({
  reducer: {
    counter: zivahireSlice, 
    [zivahireServices.reducerPath]: zivahireServices.reducer,
    [usersearchService.reducerPath]: usersearchService.reducer,
    [userpromptService.reducerPath]: userpromptService.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([zivahireServices.middleware , usersearchService.middleware , userpromptService.middleware]),
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;