import Constants from '../constants/Constants';
import {combineReducers} from 'redux';
import TodoHelpers from '../utils/todoHelpers';

// we could have put all these reducers in separate files.

const allReducer = (prevState=[], action) => {
  switch(action.type){
    case Constants.LOAD_TODOS:
      if(action.data.filter === 'all' && prevState.length === 0){
        return action.data.todos.map(eachTodo => eachTodo.id);
      }
      else 
        return prevState;

    case Constants.ADD_TODO:  
      return [...prevState, action.data.id];

    case Constants.TOGGLE_TODO:  
      return prevState;

    case Constants.DELETE_TODO:  
      return TodoHelpers.deleteTodoIndexAtIndex(prevState, action.data.id);
    default: 
      break;  
  }
  return prevState;
}

const activeReducer = (prevState=[], action) => {
  switch(action.type){
    case Constants.LOAD_TODOS:
      if(action.data.filter !== 'completed' && prevState.length === 0){
        return action.data.todos
          .filter(eachTodo => !eachTodo.isComplete)
          .map(eachTodo => eachTodo.id)
      }
      else 
        return prevState;

    case Constants.ADD_TODO:  
      if( !action.data.isComplete ) {
        return [...prevState, action.data.id];
      } else {
        return prevState;
      }

    case Constants.TOGGLE_TODO:  
      if( !prevState.includes(action.data.id) ) {
        return [...prevState, action.data.id];
      } else {
        return TodoHelpers.deleteTodoIndexAtIndex(prevState, action.data.id);
      }

    case Constants.DELETE_TODO:  
      if( !action.data.isComplete ) {
        return TodoHelpers.deleteTodoIndexAtIndex(prevState, action.data.id);
      } else {
        return prevState;
      }
    default: 
      break;  
  }
  return prevState;
}


const completedReducer = (prevState=[], action) => {
  switch(action.type){
    case Constants.LOAD_TODOS:
      if(action.data.filter !== 'active' && prevState.length === 0){
        return action.data.todos
          .filter(eachTodo => eachTodo.isComplete)
          .map(eachTodo => eachTodo.id);
      }
      else 
        return prevState;

    case Constants.ADD_TODO:  
      if( action.data.isComplete ) {
        return [...prevState, action.data.id];
      } else {
        return prevState;
      }

    case Constants.TOGGLE_TODO:  
      if( !prevState.includes(action.data.id) ) {
        return [...prevState, action.data.id];
      } else {
        return TodoHelpers.deleteTodoIndexAtIndex(prevState, action.data.id);
      }

    case Constants.DELETE_TODO:  
      if( action.data.isComplete ) {
        return TodoHelpers.deleteTodoIndexAtIndex(prevState, action.data.id);
      } else {
        return prevState;
      }
    default: 
      break;  
  }
  return prevState;
}



const idsByFilterReducer = combineReducers({
  all: allReducer,
  active: activeReducer,
  completed: completedReducer,
});

export default idsByFilterReducer;