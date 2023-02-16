import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Provider } from "react-redux";
import { store } from "./slices/index";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline enableColorScheme />
          <App />
        </Provider>
      </ThemeProvider>
    </SnackbarProvider>
  </BrowserRouter>
);
