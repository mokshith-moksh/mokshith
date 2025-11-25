import { configureStore } from "@reduxjs/toolkit";
import windowsReducer from "./windows/windowSlice";
export const store = configureStore({
  reducer: {
    windows: windowsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
