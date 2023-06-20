import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import profileReducer from "./features/profileSlice";
import cartReducer from "./features/cartSlice";
import countValueReducer from "./features/countValueInput";
import cartSlice from "./features/cartSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  profile: profileReducer,
  cart: cartSlice,
  countValue: countValueReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
