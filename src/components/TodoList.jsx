import React, { useState, useEffect } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import "./_TodoList.scss";

const TodoList = ({ type, size }) => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          item: todo.trim(),
        },
      ]);
    }
    setTodo("");
  };

  const handleDeleteClick = (id) => {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  };

  return (
    <section data-type={type} data-size={size}>
      <div className="container">
        <h3>Inköpslista</h3>
        <form className="todo_form">
          <input
            type="text"
            id="todo_input"
            value={todo}
            onChange={handleInputChange}
            className="todo_input"
            placeholder="Vad vill du lägga till?"
          ></input>
          <button className="todo_add" onClick={addTodo}>
            Lägg till
          </button>
        </form>
        <ul className="todo_list">
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.item}
              <CheckBoxIcon
                className="todo_delete"
                onClick={() => handleDeleteClick(todo.id)}
              >
                Ta bort
              </CheckBoxIcon>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TodoList;
