import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
function getTodoItems(todos, handleToggle, handleDelete){
  return todos.map((eachTodo)=>{
    return <TodoItem key={eachTodo.id} todo={eachTodo} handleToggle={handleToggle} handleDelete={handleDelete}/>;
  })
}

const TodoList = (props)=>{
  return <section className="TodoList">
    <ul>{getTodoItems(props.todos, props.handleToggle, props.handleDelete)}</ul>
  </section>;
}

export default TodoList;