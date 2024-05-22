import React, { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Error from "../components/Error";
import Loading from "../components/Loading";
import SingleTodo from "../components/SingleTodo";
import "./pages_css/ToDo.css";

function ToDo() {
  const URL_API = "http://localhost:3000";
  const userId = useOutletContext();
  const [jsonTodoList, setJsonTodoList] = useState();
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [addTaskButton, setAddTaskButton] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTaskId, setSearchTaskId] = useState("");
  const updateTask = useRef();
  const [sort, setSort] = useState("");
  useEffect(() => {
    document.body.classList.add("todo-page");
    (async () => await fetchToDo())();
    return () => {
      document.body.classList.remove("todo-page");
    };
  }, []);
  useEffect(() => {
    if (searchTerm == "" && searchTaskId == "") {
      setTodoList(jsonTodoList);
    } else {
      setTodoList(
        jsonTodoList
          .filter((todo) =>
            todo.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((todo) =>
            searchTaskId ? todo.id.toString() === searchTaskId : true
          )
      );
    }
  }, [searchTerm, searchTaskId]);

  const fetchToDo = async () => {
    try {
      const response = await fetch(`${URL_API}/users/${userId}/todos`);
      if (!response.ok) {
        throw Error("Did not receive expected data");
      }
      const result = await response.json();
      setJsonTodoList(result);
      setTodoList(result);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  function addTask() {
    setAddTaskButton(!addTaskButton);
  }

  const createTaskInDataBase = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: userId,
      title: updateTask.current,
      completed: false,
    };
    const response = await fetch(`${URL_API}/todos`, {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).catch((error) => {
      console.log("Error:", error);
    });
    const result = await response.json();
    console.log(result);
    setTodoList((previousTodos) => [...previousTodos, result]);
    setAddTaskButton(false);
  };

  useEffect(() => {
    function randomSort(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
    function sortTodo() {
      switch (sort) {
        case "serial":
          const serialSort = jsonTodoList.sort((a, b) => a.id - b.id);
          setTodoList([...serialSort]);
          break;
        case "alphabetical":
          const alphabeticalSort = jsonTodoList.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          console.log(alphabeticalSort);
          setTodoList([...alphabeticalSort]);
          break;
        case "execute":
          const executeSort = jsonTodoList.sort(
            (a, b) => a.completed - b.completed
          );
          console.log(executeSort);
          setTodoList([...executeSort]);
          break;
        case "random":
          setTodoList(randomSort([...jsonTodoList]));
          break;
      }
    }
    sortTodo();
  }, [sort]);
  function clearHandler() {
    setSearchTerm("");
    setSearchTaskId("");
  }

  return (
    <div className="container">
      <div className="searchSortAndAdd">
        <button className="add-btn" onClick={addTask}>
          add Task <i className="fa-solid fa-plus"></i>
        </button>
        <label className="sortBy" htmlFor="sort">
          Sort by:{" "}
        </label>
        <select id="sort" onChange={(e) => setSort(e.target.value)}>
          <option value="serial">Serial</option>
          <option value="execute">Execution</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">Random</option>
        </select>
        <br />
        <div>
          <label className="searchBy" htmlFor="search">
            Search by:{" "}
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tasks"
          />
          <br />
          <input
            type="text"
            value={searchTaskId}
            onChange={(e) => setSearchTaskId(e.target.value)}
            placeholder="Search task by id"
          />
          <br />
          <button onClick={clearHandler}>Clear</button>
        </div>

        {addTaskButton && (
          <form className="add-form">
            <i class="fa-solid fa-circle-xmark" onClick={addTask}></i>
            <label name="task" htmlFor="task">
              task:
            </label>
            <input
              name="task"
              id="task"
              onChange={(e) => (updateTask.current = e.target.value)}
              type="text"
            />
            <button className="save-btn" onClick={createTaskInDataBase}>
              save changes
            </button>
          </form>
        )}
      </div>
      {isLoading && <Loading />}
      {fetchError && <Error message={fetchError} />}
      {!isLoading &&
        !fetchError &&
        todoList.map((todo, key) => {
          return (
            <SingleTodo
              todo={todo}
              todoList={todoList}
              setTodoList={setTodoList}
              key={todo.id}
            />
          );
        })}
    </div>
  );
}
export default ToDo;
