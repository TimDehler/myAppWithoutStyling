/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ToDo from "./ToDo";
import { useState, useEffect } from "react";

const TodoList = () => {
  const [opencount, countOpenTodos] = useState(0);
  const [todos, setTodos] = useState(() => {
    const items = localStorage.getItem("items");
    const parsed = JSON.parse(items);
    return parsed || [];
  });
  const [textInput, settTextInput] = useState("");

  const changeText = (e) => {
    settTextInput(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    const newTodos = [...todos, { description: textInput, done: false }];
    setTodos(newTodos);
    settTextInput("");
  };

  const countOpen = () => {
    const doneTodos = todos.filter((item) => {
      return !item.done;
    });
    countOpenTodos(doneTodos.length);
  };

  const changeTodo = (index) => {
    const newTodos = [...todos];
    if (newTodos[index].done) {
      newTodos[index].done = false;
    } else {
      newTodos[index].done = true;
    }
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  useEffect(() => {
    countOpen();
    localStorage.setItem("items", JSON.stringify(todos));
  }, [todos, countOpen]);

  return (
    <div>
      <div>
        <h1>ToDo's</h1>
        <h2>Offene Todos {opencount}</h2>
        <form>
          <input
            type="text"
            onChange={changeText}
            value={textInput}
            placeholder="New ToDo..."
          ></input>
          <input onClick={submit} type="submit" value="Add Todo"></input>
        </form>
      </div>
      {todos.map((item, index) => {
        return (
          <ToDo
            key={index}
            description={item.description}
            done={item.done}
            index={index}
            onChangeTodo={changeTodo}
            onClickDeleteTodo={deleteTodo}
          ></ToDo>
        );
      })}
    </div>
  );
};

export default TodoList;
