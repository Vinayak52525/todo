import React from "react";
import Header from "./Header";
import classes from "./AppView.module.css";
import InputBox from "./InputBox";
import OutputWindow from "./OutputWindow";

function AppView() {
  return (
    <div className={classes["app-view"]}>
      <Header />
      <InputBox />
      <OutputWindow />
    </div>
  );
}

export default AppView;
