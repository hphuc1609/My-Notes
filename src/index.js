/* eslint-disable react/no-deprecated */
import { ThemeProvider } from "@material-ui/core";
import toastConfig from "configs/toast";
import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { theme } from "./createTheme";
import "./i18n";

const rootNode = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ToastContainer {...toastConfig} />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  rootNode
);
