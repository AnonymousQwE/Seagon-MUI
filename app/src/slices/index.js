import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import productsReducer from "./productsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productsReducer,
  },
});
