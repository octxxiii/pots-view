import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // if you have a CSS file
import App from "./App"; // ensure this points to your main App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
