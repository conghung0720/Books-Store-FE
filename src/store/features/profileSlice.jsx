import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infoUser: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getUser: (state = initialState, action) => {
      state.infoUser = action.payload;
    },
  },
});

export const { getUser } = profileSlice.actions;

export default profileSlice.reducer;
