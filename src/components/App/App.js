import React, { Component } from 'react';
import logo from './logo.svg';
import TodoApp from '../Todo/TodoApp/TodoApp';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <TodoApp />
      </div>
    );
  }
}

export default App;
