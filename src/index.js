import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import TaskProvider from "./context/tasks-context";

ReactDOM.render(
  <React.StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
