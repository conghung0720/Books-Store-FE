import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  valueItem: 1,
};

export const countValueSlice = createSlice({
  name: "countValue",
  initialState,
  reducers: {
    increment: (state) => {
      state.valueItem += 1;
    },
    decrement: (state) => {
      state.valueItem -= 1;
    },
    addValue: (state, action) => {
      state.valueItem = action.payload;
    },
  },
});

export const { increment, decrement, addValue } = countValueSlice.actions;

export default countValueSlice.reducer;
