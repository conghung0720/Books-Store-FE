import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemsCart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action) => {
      const newItem = action.payload;
      state.itemsCart.push(newItem);
    },
    // removeItem: (state, action) => {
    //   state.filter((item) => item !== action.payload);
    // },
  },
});
export const { addItems, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
