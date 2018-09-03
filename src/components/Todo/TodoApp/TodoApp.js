import React from 'react';
import TodoInput from '../TodoInput/TodoInput';
import TodoList from '../TodoList/TodoList';
import Footer from '../Footer/Footer';
import {loadTodos } from '../../../services/TodoService';
import PropTypes from 'prop-types';
import Constants from '../../../constants/Constants';
import StoreFactory from '../../../store/StoreFactory';

import './TodoApp.css';

class TodoApp extends React.Component {

  store = StoreFactory.getStore()

  static contextTypes = {
    route: PropTypes.string,
    handleLinkClick : PropTypes.func
  }
  state = {
    todos: [],
    currentTodo: '',
    errorMessage: ''
  }

  componentDidMount(){
    loadTodos().then((todoItems)=>{
      debugger;
      this.store.dispatch({
        type: Constants.LOAD_TODOS,
        data: todoItems
      });
    });

    this.store.subscribe(()=>{
      
      debugger;
      this.forceUpdate();
    });
  }

  filter(todos){
    switch(this.context.route){
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
            
    return this.state.todos;
  }

  handleInputSubmit = (event) => {
    event.preventDefault();

    this.store.dispatch({
      type: Constants.ADD_TODO,
      data: {
        text: this.store.getState().currentTodo
      }
    });
  }

  handleInputChange = (event) => {
    this.store.dispatch({
      type: Constants.CHANGE_CURRENT_TODO,
      data: event.target.value
    });
  }

  handleToggle = (id, event) => {
    this.store.dispatch({
      type: Constants.TOGGLE_TODO,
      data: id
    });
  }

  handleInvalidInputSubmit = (event) => {
    event.preventDefault();
    this.store.dispatch({
      type: Constants.SHOW_ERROR_MSG,
      data: 'Todo Item cannot be empty'
    });
  }

  handleDelete = (id, event)=>{
    this.store.dispatch({
      type: Constants.DELETE_TODO,
      data: id
    });
  }

  render(){
    debugger;
    const state = this.store.getState()
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

        <TodoList todos={state.todos} handleToggle={this.handleToggle} handleDelete={this.handleDelete} />
      </section>
      <Footer />
    </div>;
  }
}

export default TodoApp;

