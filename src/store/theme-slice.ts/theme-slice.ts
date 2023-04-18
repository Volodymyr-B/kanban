import { createSlice } from "@reduxjs/toolkit";

interface Theme {
  theme: string | null;
}

const initialState: Theme = {
  theme: null,
};
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    themeSwitch(state) {
      if (state.theme === null || state.theme === "light") {
        state.theme = "dark";
      } else {
        state.theme = "light";
      }
    },
  },
});
export const { themeSwitch } = themeSlice.actions;

export default themeSlice.reducer;
