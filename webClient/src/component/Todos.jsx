/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-underscore-dangle */
import React, { useState, useContext, useEffect } from "react";
import TodoItem from "./TodoItem";

import TodoService from "../services/TodoService";

import { AuthContext } from "../context/AuthContext";


const Todo = () => {
  const [todo, setTodo] = useState({ name: "" });
  const [todos, setTodos] = useState([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    TodoService.getTodos().then((data) => {
      //   console.log(data["todos"]);
      setTodos(data.todos);
    });
  }, []);



  const resetForm = () => {
    setTodo({ name: "" });
  };




  
  const onSubmit = (e) => {
    e.preventDefault();
    TodoService.postTodo(todo).then((data) => {
      const { message } = data;
      resetForm();
      if (!message.msgError) {
        TodoService.getTodos().then((getData) => {
          setTodos(getData.todos);
         
        });
      }
      // client token expired
      else if (message.msgBody === "unAuthrozied") {
       
        // update global state incase token expires
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      }
      // error condition handled here
      
    });
  };
  const onChange = (e) => {
    setTodo({ name: e.target.value });
  };

  return (
    <div>
      <ul className="list-group">
        {todos.map((t) => {
          return <TodoItem key={t._id} todo={t} />;
        })}
      </ul>

      <form onSubmit={onSubmit}>
        <label htmlFor="todo">Enter Todo</label>
        <input
          type="text"
          className="form-control"
          onChange={onChange}
          value={todo.name}
          name="name"
          required
        />
        <button type="submit" className="btn btn-lg btn-success">Submit</button>
      </form>
     
    </div>
  );
};
export default Todo;
