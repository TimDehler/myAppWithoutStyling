import React from "react";

function ToDo({ description, done, onChangeTodo, onClickDeleteTodo, index }) {
  return (
    <div>
      <div>
        <h1
          onClick={() => {
            onChangeTodo(index);
          }}
        >
          {description}
        </h1>
        <button
          onClick={() => {
            onClickDeleteTodo(index);
          }}
        >
          ❌
        </button>
      </div>
    </div>
  );
}

export default ToDo;
