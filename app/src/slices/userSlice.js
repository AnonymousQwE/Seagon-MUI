import { createSlice } from "@reduxjs/toolkit";
import {
  getUserData,
  loginUser,
  logoutUser,
  registerUser,
} from "../hooks/userHook";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    status: null,
    notify: [],
  },
  reducers: {
    clearNotify: (state) => {
      state.notify = [];
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.user += action.payload;
      state.status = "loaded";
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.status = "rejected";
      state.notify.push({ type: "error", content: action.payload });
    });

    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.notify.push({
        type: "success",
        content: "Вы успешно авторизовались! Добро пожаловать!",
      });
      state.status = "loaded";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.notify.push({ type: "error", content: action.payload });
      state.status = "rejected";
    });

    builder.addCase(registerUser.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.notify.push({
        type: "success",
        content: "Вы успешно зарегистрировались!Добро пожаловать!",
      });
      state.status = "loaded";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.notify.push({ type: "error", content: action.payload });
      state.status = "rejected";
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = {};
      state.notify.push({
        type: "success",
        content: "Вы успешно вышли из системы. До свидания!",
      });
      state.status = "loaded";
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.status = "rejected";
      state.notify.push({ type: "error", content: action.payload });
    });
  },
});

export const { clearNotify, setUser } = userSlice.actions;

export default userSlice.reducer;
