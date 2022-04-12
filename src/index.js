import React from "react";
import ReactDOM from "react-dom";
import { SocketContext, socket } from "./context/socket";
import AuthProvider  from "./context/authContext";
import App from "./app";
import "./index.css";

console.log('api ', process.env.REACT_APP_API_URL_ENV)
ReactDOM.render(
  <AuthProvider>
    <SocketContext.Provider value={socket}>
      <App />
    </SocketContext.Provider>
  </AuthProvider>,
  document.body.querySelector("main")
);
