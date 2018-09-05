import todosReducer from './todosReducer';
import currentTodoReducer from './currentTodoReducer';
import errorMessageReducer from './errorMessageReducer';

let defaultState = {
  todos: [],
  currentTodo:'',
  errorMessage: ''
};

let storeReducer = (prevState = defaultState, action)=>({
  todos: todosReducer(prevState.todos, action),
  currentTodo: currentTodoReducer(prevState.currentTodo, action),
  errorMessage: errorMessageReducer(prevState.errorMessage, action)
});

export default storeReducer;