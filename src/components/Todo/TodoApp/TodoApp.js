import React from 'react';
import TodoInput from '../TodoInput/TodoInput';
import TodoList from '../TodoList/TodoList';
import Footer from '../Footer/Footer';
import {loadTodos } from '../../../services/TodoService';
import PropTypes from 'prop-types';
import Constants from '../../../constants/Constants';


import './TodoApp.css';

class TodoApp extends React.Component {

  static contextTypes = {
    store: PropTypes.object,
  }

  componentDidMount(){
    loadTodos().then((todoItems)=>{
      debugger;
      this.context.store.dispatch({
        type: Constants.LOAD_TODOS,
        data: todoItems
      });
    });

    this.context.store.subscribe(()=>{
      this.forceUpdate();
    });
  }

  filter(todos, filter){
    switch(filter){
      case '/active': 
        return todos
          .filter((eachTodo)=>{
            return !eachTodo.isComplete;
          })
      case '/completed': 
        return todos
          .filter((eachTodo)=>{
            return eachTodo.isComplete;
          })
      default:
        break;
    }
            
    return todos;
  }

  handleInputSubmit = (event) => {
    event.preventDefault();

    this.context.store.dispatch({
      type: Constants.ADD_TODO,
      data: {
        text: this.context.store.getState().currentTodo
      }
    });
  }

  handleInputChange = (event) => {
    this.context.store.dispatch({
      type: Constants.CHANGE_CURRENT_TODO,
      data: event.target.value
    });
  }

  handleToggle = (id, event) => {
    this.context.store.dispatch({
      type: Constants.TOGGLE_TODO,
      data: id
    });
  }

  handleInvalidInputSubmit = (event) => {
    event.preventDefault();
    this.context.store.dispatch({
      type: Constants.SHOW_ERROR_MSG,
      data: 'Todo Item cannot be empty'
    });
  }

  handleDelete = (id, event)=>{
    this.context.store.dispatch({
      type: Constants.DELETE_TODO,
      data: id
    });
  }

  render(){
    const state = this.context.store.getState()
    const submitHandler = !state.currentTodo || state.currentTodo.trim() === '' ? this.handleInvalidInputSubmit: this.handleInputSubmit
    return <div className="TodoApp">
      <header className="header">
        <h1>todos</h1>
      </header>
      <section className="main">
        <TodoInput value={state.currentTodo} 
          handleInputChange={this.handleInputChange} 
          handleSubmit={submitHandler}
          /> <span className="'errorMsg'">{state.errorMessage}</span>

        <TodoList todos={this.filter(state.todos, state.filter)} handleToggle={this.handleToggle} handleDelete={this.handleDelete} />
      </section>
      <Footer />
    </div>;
  }
}

export default TodoApp;

