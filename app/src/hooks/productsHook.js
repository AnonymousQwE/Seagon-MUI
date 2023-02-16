import { createAsyncThunk } from "@reduxjs/toolkit";

import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

// !----- Добавление продукта -------!
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ product }, { rejectWithValue }) => {
    try {
      await setDoc(doc(db, "products"), product);

      return product;
    } catch (error) {
      let errorData;
      console.log(error);
      switch (error.code) {
        case "auth/email-already-in-use":
          errorData = "Этот email уже используется в системе!";
          break;
        case "auth/weak-password":
          errorData = "Пароль слишком лёгкий. Не менее 6 символов";
          break;

        default:
          errorData = "Неизвестная ошибка. Обратитесь к администратору!";
          break;
      }
      return rejectWithValue(errorData);
    }
  }
);
// !----- Получение хранилища продукта -------!
export const getStorage = createAsyncThunk(
  "products/getStorage",
  async (props, { rejectWithValue }) => {
    console.log(props);
    // try {
    //   const storagesSnapshot = await getDocs(collection(db, `storages`));
    //   console.log(storagesSnapshot);
    // let storages = [];
    // storagesSnapshot.forEach((doc, i) => {
    //   const result = {
    //     ...doc.data(),
    //   };
    // });
    // return storages;
    // } catch (error) {
    //   let errorData;
    //   console.log(error);
    //   switch (error.code) {
    //     case "firestore/weak-password":
    //       errorData = "ERROR";
    //       break;

    //     default:
    //       errorData = "Неизвестная ошибка. Обратитесь к администратору!";
    //       break;
    //   }
    //   return rejectWithValue(errorData);
    // }
  }
);
// !----- Изменение продукта -------!
export const setProducts = createAsyncThunk(
  "products/setProducts",
  async ({ product }, { rejectWithValue }) => {
    try {
      const productDoc = doc(db, "products", product.id);
      const newImage = { image: product.image };
      await updateDoc(productDoc, newImage);
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  }
);
