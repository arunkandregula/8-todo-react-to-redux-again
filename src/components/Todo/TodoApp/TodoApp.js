import React from 'react';
import TodoInputContainer from '../TodoInput/TodoInputContainer';
import TodoListContainer from '../TodoList/TodoListContainer';
import Footer from '../Footer/Footer';
//import {loadTodos } from '../../../services/TodoService';
//import PropTypes from 'prop-types';
//import Constants from '../../../constants/Constants';


import './TodoApp.css';

const TodoApp = (props) => {

  return <div className="TodoApp">
    <header className="header">
      <h1>todos</h1>
    </header>
    <section className="main">
      <TodoInputContainer />
      <TodoListContainer />
    </section>
    <Footer />
  </div>;
}

export default TodoApp;

