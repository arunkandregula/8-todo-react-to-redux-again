import todosReducer, * as fromTodosReducer from './todosReducer';
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

// We usually call these selectors becuase they select something from the state
export function getFilteredList(state, filter){
  return fromTodosReducer.getFilteredList(state.todos, filter);
}

export function getIsFetching(state, filter){
  return fromTodosReducer.getIsFetching(state.todos, filter);
}

export function getErrorMessageOnTab(state, filter){
  return fromTodosReducer.getErrorMessageOnTab(state.todos, filter);
}


