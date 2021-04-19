import React from "react";

import ReactDOM from "react-dom";

import AuthProvider from "./context/AuthContext";

import AppContext from './context/appContext'

import App from "./App";

import './index.css';

ReactDOM.render(
  <AuthProvider>
    <AppContext>
    <App />
    </AppContext>
  </AuthProvider>,
  document.getElementById("root")
);
