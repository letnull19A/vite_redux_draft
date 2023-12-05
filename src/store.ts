import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from "./slice";

export const store = configureStore({
  reducer: {
    counter: applicationReducer
  },
});

export type ApplicationRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
