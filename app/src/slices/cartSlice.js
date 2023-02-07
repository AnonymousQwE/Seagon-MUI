import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    status: null,
    notify: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const i = state.cart.findIndex((e) => action.payload.id === e.id);
      if (i !== -1) {
        state.cart[i].count += action.payload.count;
        if (state.cart[i].count <= 0) {
          state.cart = state.cart.filter((e) => e.id !== action.payload.id);
        }
      } else if (action.payload.count > 0) {
        state.cart.push(action.payload);
        state.notify.push({
          type: "success",
          content: `${action.payload.title} добавлен в корзину`,
        });
      }
    },
    removeToCart: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload.id
      );
      state.notify.push({
        type: "success",
        content: `${action.payload.title} удален с корзины`,
      });
    },
    clearCartNotify: (state) => {
      state.notify = [];
    },
  },
});

export const { addToCart, removeToCart, clearCartNotify } = cartSlice.actions;

export default cartSlice.reducer;
