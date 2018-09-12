import Constants from '../constants/Constants';
import TodoHelpers from '../utils/todoHelpers';
import createIsFetchingReducer from './createIsFetchingReducer';
import {combineReducers} from 'redux';

const idsReducer = (prevState=[], action) => {
  switch(action.type){
    case Constants.RECEIVE_TODOS:
      if(action.data.filter !== 'active' && prevState.length === 0){
        return action.data.todos
          .filter(eachTodo => eachTodo.isComplete)
          .map(eachTodo => eachTodo.id);
      }
      else 
        return prevState;

    case Constants.ADD_TODO_SUCCESS:
      if( action.data.isComplete ) {
        return [...prevState, action.data.id];
      } else {
        return prevState;
      }

    case Constants.TOGGLE_TODO_SUCCESS:
      if( !prevState.includes(action.data.id) ) {
        return [...prevState, action.data.id];
      } else {
        return TodoHelpers.deleteTodoIndexAtIndex(prevState, action.data.id);
      }

    case Constants.DELETE_TODO_SUCCESS:
      if( prevState.includes(action.data.id) ) {
        return TodoHelpers.deleteTodoIndexAtIndex(prevState, action.data.id);
      } else {
        return prevState;
      }
    default: 
      break;  
  }
  return prevState;
}

const completedReducer = combineReducers({
  ids: idsReducer,
  isFetching: createIsFetchingReducer('completed')
});

export default completedReducer;
