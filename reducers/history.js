import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addHistory: (state, action) => {
      const exist = state.value.some(city => city.name === action.payload.name)
      if(!exist) {
        state.value.push(action.payload);
      }
    },

    removeHistory: (state, action) => {
      state.value = state.value.filter(history => history.name !== action.payload.name);
    },

    removeAllHistory: (state) => {
      state.value = [];
    },
  },
});

export const { addHistory, removeAllHistory, removeHistory } = historySlice.actions;
export default historySlice.reducer;
