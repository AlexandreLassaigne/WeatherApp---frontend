import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    addCity: (state, action) => {
      state.value = [action.payload]
    },

    removeCity: (state, action) => {
      state.value = state.value.filter(history => history.name !== action.payload.name);
    },

    removeAllCity: (state) => {
      state.value = [];
    },
  },
});

export const { addCity, removeAllCity, removeCity } = citySlice.actions;
export default citySlice.reducer;
