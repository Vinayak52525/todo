import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/tasks-context";
import classes from "./Footer.module.css";

function Footer(props) {
  const { taskList, deleteAllTask } = useContext(TaskContext);
  const [selectedState, setSelectedState] = useState("active");

  useEffect(() => {
    setSelectedState("all");
  }, [taskList]);

  const allTaskHandler = () => {
    setSelectedState("all");
    props.sortHandlers("all");
  };

  const activeTaskHandler = () => {
    setSelectedState("active");
    props.sortHandlers("active");
  };

  const completedTaskHandler = () => {
    setSelectedState("completed");
    props.sortHandlers("completed");
  };

  const clearAll = () => {
    deleteAllTask();
  };

  return (
    <div className={classes.footer}>
      <p>{taskList.length + " items left"}</p>
      <div>
        <p
          className={selectedState === "all" ? classes.selectedState : ""}
          onClick={allTaskHandler}
        >
          All
        </p>
        <p
          className={selectedState === "active" ? classes.selectedState : ""}
          onClick={activeTaskHandler}
        >
          active
        </p>
        <p
          className={selectedState === "completed" ? classes.selectedState : ""}
          onClick={completedTaskHandler}
        >
          completed
        </p>
      </div>
      <p onClick={clearAll}>clear complete</p>
    </div>
  );
}

export default Footer;
