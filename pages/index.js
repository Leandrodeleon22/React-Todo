import { useReducer, useState } from "react";

import classes from "../components/global.module.css";

const ACTION = {
  ADD_TODO: "Add-Todo",
  DELETE_TODO: "Delete-Todo",
  TOGGLE_TODO: "Toggle-Todo",
};

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  function reducer(state, action) {
    if (action.type === ACTION.ADD_TODO) {
      return [...state, newTodo(action.payload.name)];
    }

    if (action.type === ACTION.DELETE_TODO) {
      return state.filter((todo) => todo.id !== action.payload.id);
    }

    if (action.type === ACTION.TOGGLE_TODO) {
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    }

    
  }

  function newTodo(name) {
    return { id: Date.now(), complete: false, name: name };
  }

  const [state, dispatch] = useReducer(reducer, []);

  function inputHandler(e) {
    setInputValue(e.target.value);
  }
  

  function submitHandler(e) {
    e.preventDefault();
    if (inputValue === "") return;
    dispatch({ type: ACTION.ADD_TODO, payload: { name: inputValue } });
    setInputValue("");
  }

  const allTodo = state.map((todo) => {
    function deleteTodo() {
      dispatch({ type: ACTION.DELETE_TODO, payload: { id: todo.id } });
    }

    function toggleTodo() {
      dispatch({ type: ACTION.TOGGLE_TODO, payload: { id: todo.id } });
    }
    console.log(todo.complete);

    return (
      <div key={todo.id}>
        <span
          className={
            todo.complete ? `${classes.todoNormal}` : `${classes.todoComplete}`
          }
        >
          {todo.name}
        </span>
        <button onClick={toggleTodo}>toggle</button>
        <button onClick={deleteTodo}>delete</button>
      </div>
    );
  });

  console.log(state);
  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler}>
        <input type="text" value={inputValue} onChange={inputHandler}></input>
        <button>submit</button>
      </form>
      {allTodo}
    </div>
  );
}
