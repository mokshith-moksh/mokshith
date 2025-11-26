import { createSlice } from "@reduxjs/toolkit";
import { locations } from "#constants/index";
const initialState = {
  activeLocation: locations.work,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setActiveLocation: (state, action) => {
      state.activeLocation = action.payload;
    },
    resetActiveLocation: (state) => {
      state.activeLocation = locations.work;
    },
  },
});

export const { setActiveLocation } = locationSlice.actions;
export default locationSlice.reducer;
