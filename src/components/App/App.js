import React, { Component } from 'react';
import logo from './logo.svg';
import TodoApp from '../Todo/TodoApp/TodoApp';
import Router from '../Router/Router';
//import Provider from '../Provider/Provider';
import StoreFactory from '../../store/StoreFactory';
import {Provider} from 'react-redux';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={StoreFactory.getStore()}>
          <Router>
            <TodoApp />
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
