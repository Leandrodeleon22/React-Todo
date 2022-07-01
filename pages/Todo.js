import React from 'react'
import {ACTION} from './index'

function Todo () {
  return (
    <div>
          
        <span
          className={todo.complete ? classes.todoNormal : classes.todoComplete}
        >
          {todo.name}
        </span>
        <button onClick={toggleTodo}>toggle</button>
        <button onClick={deleteTodo}>delete</button>

    </div>
  )
}

export default Todo