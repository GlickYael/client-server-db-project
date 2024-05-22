import React, { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Error from "./Error";
import "../pages/pages_css/ToDo.css";
function SingleTodo({ todo, todoList, setTodoList }) {
  const URL_API = "http://localhost:3000";
  const [updateTaskButton, setUpdateTaskButton] = useState(false);
  const [updatedTask, setUpdatedTask] = useState();
  const [fetchError, setFetchError] = useState(null);
  const userId = useOutletContext();

  const deleteTask = async () => {
    const updatedTodoList = todoList.filter(
      (currentTodo) => currentTodo.id != todo.id
    );
    try {
      const respons = await fetch(`${URL_API}/todos/${todo.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!respons.ok) {
        throw Error("Did not delete task");
      } else {
        setTodoList(updatedTodoList);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };
  function updateTodo() {
    setUpdatedTask(todo.title);
    setUpdateTaskButton(!updateTaskButton);
  }
  const updateTaskInDataBase = async () => {
    setUpdateTaskButton(false);

    const updatedData = {
      userId: todo.userId,
      id: todo.id,
      title: updatedTask,
      completed: todo.completed,
    };
    const updatedTodoList = todoList.map((currentTodo) =>
      currentTodo.id == todo.id
        ? { ...currentTodo, title: updatedTask }
        : currentTodo
    );
    if (updatedTask != "") {
      try {
        const response = await fetch(`${URL_API}/todos/${todo.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
          throw Error("Did not delete task");
        } else {
          setTodoList(updatedTodoList);
        }
      } catch (err) {
        setFetchError(err);
      }
    } else {
      setFetchError("invalid input: value most be put into task");
    }
  };
  const updateStateTask = async () => {
   
    const updatedData = {
      userId: todo.userId,
      id: todo.id,
      title: todo.title,
      completed: !(todo.completed),
    };
    const updatedTodoList = todoList.map((currentTodo) =>
      currentTodo.id == todo.id
        ? { ...currentTodo,  completed: !(todo.completed) }
        : currentTodo
    );
    if (updatedTask != "") {
      try {
        const response = await fetch(`${URL_API}/todos/${todo.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
          throw Error("Did not delete task");
        } else {
          setTodoList(updatedTodoList);
        }
      } catch (err) {
        setFetchError(err);
      }
    } else {
      setFetchError("invalid input: value most be put into task");
    }
  };

  return (
    <>
      {fetchError && <Error err={fetchError} />}
      {!fetchError && (
        <div className="todo-item">
          {todo.id}:<h4>{todo.title} </h4>
          <input
            onChange={updateStateTask}
            type="checkBox"
            checked={todo.completed}
            className="checkbox"
          />
          <button onClick={deleteTask} className="delete-btn">
            {" "}
            <i className="fa-solid fa-trash-can"></i>
          </button>
          <button onClick={updateTodo} className="edit-btn">
            {" "}
            <i className="fa-solid fa-pencil"></i>
          </button>
        </div>
      )}
      {updateTaskButton && (
        <form>
          <i class="fa-solid fa-circle-xmark" onClick={updateTodo}></i>
          <label name="title" for="title">
            title:
          </label>
          <input
            name="task"
            id="task"
            value={updatedTask || ""}
            onChange={(e) => setUpdatedTask(e.target.value)}
            type="text"
          />
          <button className="save-btn" onClick={updateTaskInDataBase}>
            save changes
          </button>
        </form>
      )}
    </>
  );
}

export default SingleTodo;
