import Constants from '../constants/Constants';
import {createTodo, updateTodo, deleteTodo} from '../services/TodoService';

const todoReducer = (prevState, action)=>{
  switch(action.type){
    case Constants.ADD_TODO:
      let newTodo = {
        ...action.data,
        isComplete: false,
      };
      // STEP1: UPDATE THE SERVER
      createTodo(newTodo).then(()=>{
        console.log('A new todo was created.')
      });
      return newTodo;

    case Constants.TOGGLE_TODO:
      let toggledTodo =  {...prevState, isComplete: !prevState.isComplete};
      // STEP1: UPDATE THE SERVER
      updateTodo(toggledTodo).then(()=>{
        console.log('The todo was updated.')
      });
      return toggledTodo;
    case Constants.DELETE_TODO:
      // STEP1: UPDATE THE SERVER
      deleteTodo(prevState).then(()=>{
        console.log('The todo was deleted.')
      });

    default:
      break;  
  }
  return prevState;
}

export default todoReducer;