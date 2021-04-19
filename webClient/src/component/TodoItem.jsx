import React from "react";

const TodoItem = (props) => {
  const {todo}=props
  return <li>{todo.name}</li>;
};
export default TodoItem;
