import todosReducer from './todosReducer';
import currentTodoReducer from './currentTodoReducer';
import errorMessageReducer from './errorMessageReducer';
import filterReducer from './filterReducer';

let defaultState = {
  todos: [],
  currentTodo:'',
  errorMessage: '',
  filter: '/'
};

let storeReducer = (prevState = defaultState, action)=>({
  filter: filterReducer(prevState.filter, action),
  todos: todosReducer(prevState.todos, action),
  currentTodo: currentTodoReducer(prevState.currentTodo, action),
  errorMessage: errorMessageReducer(prevState.errorMessage, action)
});

export default storeReducer;