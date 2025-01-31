import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addHistory: (state, action) => {
      state.value.push(action.payload);
    },

    removeAllHistory: (state) => {
      state.value = [];
    },
  },
});

export const { addHistory, removeAllHistory } = historySlice.actions;
export default historySlice.reducer;
