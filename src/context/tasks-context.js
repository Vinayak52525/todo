import React, { useEffect, useState } from "react";

export const TaskContext = React.createContext({
  taskList: [],
  isLoading: false,
  addTask: (task) => {},
  toggleCompleted: (taskId) => {},
  deleteAllTask: () => {},
});

const TaskProvider = (props) => {
  const [taskList, setTaskList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTaskData = async () => {
      const response = await fetch(
        `https://react-http-aa6fd-default-rtdb.firebaseio.com/tasks.json`
      );
      const taskData = await response.json();

      let fetchedTasks = [];
      for (let key in taskData) {
        fetchedTasks.push({
          taskId: key,
          task: taskData[key].task,
          isCompleted: taskData[key].isCompleted,
        });
      }
      setTaskList(fetchedTasks);
      setIsLoading(false);
    };

    getTaskData();
  }, []);

  const addTask = (task) => {
    setTaskList((prevState) => {
      return [...prevState, task];
    });
  };

  const deleteAllTask = async () => {
    if (taskList.length === 0) return;

    const updatedList = taskList.filter((task) => !task.isCompleted);
    const listToDelete = taskList.filter((task) => task.isCompleted);
    setTaskList(updatedList);

    await listToDelete.forEach((data) => {
      fetch(
        `https://react-http-aa6fd-default-rtdb.firebaseio.com/tasks/${data.taskId}.json`,
        {
          method: "DELETE",
        }
      );
    });
  };

  const toggleCompleted = (taskId) => {
    setTaskList((currentList) => {
      const taskIndex = currentList.findIndex((task) => task.taskId === taskId);
      const newStatus = !currentList[taskIndex].isCompleted;
      const updatedList = [...currentList];
      updatedList[taskIndex] = {
        ...currentList[taskIndex],
        isCompleted: newStatus,
      };

      return updatedList;
    });
  };

  return (
    <TaskContext.Provider
      value={{ taskList, isLoading, addTask, toggleCompleted, deleteAllTask }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
