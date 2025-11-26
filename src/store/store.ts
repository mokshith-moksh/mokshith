import { configureStore } from "@reduxjs/toolkit";
import windowsReducer from "./windows/windowSlice";
import locationReducer from "./windows/locationSlice";
export const store = configureStore({
  reducer: {
    windows: windowsReducer,
    location: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
