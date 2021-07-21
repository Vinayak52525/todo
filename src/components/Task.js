import { useContext } from "react";
import checkBoxIcon from "../assets/icon-check.svg";
import { TaskContext } from "../context/tasks-context";
import classes from "./Task.module.css";

const Task = (props) => {
  const taskCtx = useContext(TaskContext);

  const taskCompleteHandler = async () => {
    await taskCtx.toggleCompleted(props.id);

    const status = await taskCtx.taskList.find(
      (task) => task.taskId === props.id
    );

    await fetch(
      `https://react-http-aa6fd-default-rtdb.firebaseio.com/tasks/${props.id}/isCompleted.json`,
      {
        method: "PUT",
        body: JSON.stringify(!status.isCompleted),
      }
    );
  };

  const completedClasses = props.isCompleted ? classes.checked : "";
  const markedCompletedClasses = props.isCompleted
    ? `${classes.task} ${classes.isCompleted}`
    : classes.task;

  return (
    <div className={markedCompletedClasses}>
      <div className={classes.checkBoxContainer}>
        <div className={completedClasses} onClick={taskCompleteHandler}>
          <img src={checkBoxIcon} alt="checkboxs" />
        </div>
      </div>
      <div>
        <h1>{props.task}</h1>
      </div>
    </div>
  );
};

export default Task;
