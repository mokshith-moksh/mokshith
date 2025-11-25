import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants/index";

export interface WindowState {
  windows: typeof WINDOW_CONFIG;
  nextZIndex: number;
}
export interface Window {
  window: keyof typeof WINDOW_CONFIG;
}

const initialState: WindowState = {
  windows: WINDOW_CONFIG,
  nextZIndex: INITIAL_Z_INDEX + 1,
};

const windowSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    openWindow: (
      state,
      action: {
        payload: {
          data: null;
          windowKey: keyof typeof state.windows;
        };
      }
    ) => {
      const win = state.windows[action.payload.windowKey];
      win.isOpen = true;
      win.zIndex = state.nextZIndex;
      win.data = action.payload.data || null;
      state.nextZIndex += 1;
    },
    closeWindow: (
      state,
      action: { payload: { windowKey: keyof typeof state.windows } }
    ) => {
      const win = state.windows[action.payload.windowKey];
      win.isOpen = false;
      win.zIndex = INITIAL_Z_INDEX;
      win.data = null;
    },
    focusWindow: (
      state,
      action: { payload: { windowKey: keyof typeof state.windows } }
    ) => {
      const win = state.windows[action.payload.windowKey];
      win.zIndex = state.nextZIndex;
      state.nextZIndex += 1;
    },
  },
});
export const { openWindow, closeWindow, focusWindow } = windowSlice.actions;
export default windowSlice.reducer;
