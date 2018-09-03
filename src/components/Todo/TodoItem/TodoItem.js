import React from 'react';
import classNames from 'classnames';
import './TodoItem.css'
const TodoItem = (props)=>{
  debugger;
  let textClass = classNames({
    'strike': props.isComplete
  });
  return <li className="TodoItem">
      <a href="#" className="delete-icon" onClick={props.handleDelete.bind(null, props.id)}>X </a>
      <input type="checkbox" defaultChecked={props.isComplete} onChange={props.handleToggle.bind(null, props.id)}/>
      <span className={textClass} >{props.text}</span>
    </li>;
}

export default TodoItem;