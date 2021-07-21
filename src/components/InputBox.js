import React, { useContext, useState } from "react";
import { TaskContext } from "../context/tasks-context";
import classes from "./InputBox.module.css";
// import LoadingSpinner from "./UI/LoadingSpinner";

function InputBox() {
  const [inputTask, setInputTask] = useState("");
  const taskCtx = useContext(TaskContext);
  const [isLoading, setIsLoading] = useState(false);

  const addTaskHandler = async (event) => {
    if (event.keyCode !== 13 || inputTask === "") return;
    setIsLoading(true);

    const response = await fetch(
      `https://react-http-aa6fd-default-rtdb.firebaseio.com/tasks.json`,
      {
        method: "POST",
        body: JSON.stringify({ task: inputTask, isCompleted: false }),
      }
    );

    const data = await response.json();

    taskCtx.addTask({ taskId: data.name, task: inputTask, isCompleted: false });

    setIsLoading(false);
    setInputTask("");
  };

  const inputChangeHandler = (event) => {
    setInputTask(event.target.value);
  };

  return (
    <div className={classes.input}>
      <input
        value={inputTask}
        type="text"
        disabled={isLoading}
        onChange={inputChangeHandler}
        onKeyUp={addTaskHandler}
      />
      {isLoading && (
        <p style={{ color: "white", fontSize: "1.1rem", marginTop: "1em" }}>
          Updating Task...
        </p>
      )}
    </div>
  );
}

export default InputBox;
