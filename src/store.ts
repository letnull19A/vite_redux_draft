import { configureStore } from "@reduxjs/toolkit";
import { applicationSlice } from "./slice";

export const store = configureStore({
  reducer: {
    counter: applicationSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
