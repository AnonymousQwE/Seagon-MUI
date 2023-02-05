import { createAsyncThunk } from "@reduxjs/toolkit";

import { collection, doc, getDocs, setDoc } from "firebase/firestore";
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
// !----- Получение продуктов -------!
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const result = { id: doc.id, ...doc.data() };
        console.log(result);
      });
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
