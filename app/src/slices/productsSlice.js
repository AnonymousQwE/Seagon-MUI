import { createSlice } from "@reduxjs/toolkit";
import { addProduct, getProducts } from "../hooks/productsHook";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    category: [],
    status: null,
    notify: [],
  },
  reducers: {
    clearNotify: (state) => {
      state.notify = [];
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    // !----- Получение продуктов -------!
    builder.addCase(getProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = "loaded";
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.status = "rejected";
      state.notify.push({ type: "error", content: action.payload });
    });

    // !----- Добавление продукта -------!
    builder.addCase(addProduct.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products = action.payload;
      console.log(action.payload);
      state.notify.push({
        type: "success",
        content: "Вы успешно загрузили продукты!",
      });
      state.status = "loaded";
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.notify.push({ type: "error", content: action.payload });
      state.status = "rejected";
    });

    // // !----- Удаление продукта -------!
    // builder.addCase(deleteProduct.pending, (state, action) => {
    //   state.status = "loading";
    // });
    // builder.addCase(deleteProduct.fulfilled, (state, action) => {
    //   state.products = action.payload;
    //   state.notify.push({
    //     type: "success",
    //     content: "Вы успешно удалили продукт!",
    //   });
    //   state.status = "loaded";
    // });
    // builder.addCase(deleteProduct.rejected, (state, action) => {
    //   state.notify.push({ type: "error", content: action.payload });
    //   state.status = "rejected";
    // });

    // // !----- Изменение продукта -------!
    // builder.addCase(logoutUser.pending, (state) => {
    //   state.status = "loading";
    // });
    // builder.addCase(logoutUser.fulfilled, (state, action) => {
    //   state.products = action.payload;
    //   state.notify.push({
    //     type: "success",
    //     content: "Вы изменили продукт!",
    //   });
    //   state.status = "loaded";
    // });
    // builder.addCase(logoutUser.rejected, (state, action) => {
    //   state.status = "rejected";
    //   state.notify.push({ type: "error", content: action.payload });
    // });
  },
});

export const { clearNotify, setProducts, setCategory } = productsSlice.actions;

export default productsSlice.reducer;
