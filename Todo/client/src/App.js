import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_BASE = `http://localhost:3001`;
function App() {
  const [todos, setTodos] = useState([]);
  const [popup, setPopup] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const GetTodos = async () => {
    try {
      const response = await axios.get(API_BASE + `/todos`);
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const completeTodo = async (id) => {
    try {
      const response = await axios.put(API_BASE + `/todos/complete/${id}`);
      setTodos((todos) =>
        todos.map((todo) => {
          if (todo._id === response.data._id) {
            todo.complete = response.data.complete;
          }
          return todo;
        })
      );
      console.log(todos);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNode = async (id) => {
    try {
      const response = await axios.delete(API_BASE + `/todos/delete/${id}`);
      setTodos((todos) =>
        todos.filter((todo) => todo._id !== response.data._id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async () => {
    const { data } = await axios.post(API_BASE + "/todo/new", {
      text: newTodo,
    });
    setTodos([...todos, data]);

    setPopup(false);
    setNewTodo("");
  };

  useEffect(() => {
    GetTodos();
  }, []);

  return (
    <div className="App">
      <h1>Welcome Munawar</h1>
      <p>Here are your Tasks</p>
      <div className="todos">
        {todos.map((todo) => {
          return (
            <div
              className={"todo " + (todo.complete ? "is-complete" : "")}
              key={todo._id}
            >
              <div
                className="checkbox"
                onClick={() => completeTodo(todo._id)}
              ></div>
              <div className="text"> {todo.text}</div>
              <div className="delete-todo" onClick={() => deleteNode(todo._id)}>
                x
              </div>
            </div>
          );
        })}
      </div>
      <div className="addPopup" onClick={() => setPopup(true)}>
        +
      </div>
      {popup ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopup(false)}>
            X
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="button" onClick={addTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
