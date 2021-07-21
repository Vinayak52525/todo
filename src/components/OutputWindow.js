import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/tasks-context";
import AllTasks from "./AllTasks";
import Footer from "./Footer";
import classes from "./OutputWindow.module.css";

function OutputWindow() {
  const { taskList: taskCtx, isLoading } = useContext(TaskContext);

  const [list, setList] = useState();

  useEffect(() => {
    setList(taskCtx);
  }, [taskCtx]);

  const sortTasksHandler = (status) => {
    if (status === "all") {
      setList(taskCtx);
    }

    if (status === "completed") {
      setList(taskCtx.filter((task) => task.isCompleted === true));
    }

    if (status === "active") {
      setList(taskCtx.filter((task) => task.isCompleted === false));
    }
  };

  const taskListLength = useContext(TaskContext).taskList.length;
  return (
    <div className={classes.allDiv}>
      {isLoading && <p className={classes.loading}>Loading...</p>}

      {!taskListLength > 0 && !isLoading && (
        <div className={classes.noTasks}>
          <p>No Tasks to show. Please add a task!</p>
        </div>
      )}

      {taskListLength > 0 && !isLoading && <AllTasks taskList={list} />}
      <Footer sortHandlers={sortTasksHandler} />
    </div>
  );
}

export default OutputWindow;
