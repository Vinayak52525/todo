import React from "react";
import Task from "./Task";
import classes from "./AllTasks.module.css";

function AllTasks(props) {
  return (
    <div className={classes.allTasks}>
      {props.taskList.map((task) => {
        return (
          <Task
            key={task.taskId}
            id={task.taskId}
            task={task.task}
            isCompleted={task.isCompleted}
          />
        );
      })}
    </div>
  );
}

export default AllTasks;
