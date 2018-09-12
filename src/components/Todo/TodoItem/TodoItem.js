import React from 'react';
import classNames from 'classnames';

import './TodoItem.css'

const TodoItem = (props)=>{
  let textClass = classNames({
    'strike': props.isComplete
  });

  return <li className="TodoItem">
      <a href="#" className="delete-icon" onClick={props.handleDelete.bind(null, props.todo.id)}>X </a>
      <input type="checkbox" defaultChecked={props.todo.isComplete} onChange={props.handleToggle.bind(null, props.todo)}/>
      <span className={textClass} >{props.todo.text}</span>
    </li>;
}

export default TodoItem;