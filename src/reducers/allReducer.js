import Constants from '../constants/Constants';
import TodoHelpers from '../utils/todoHelpers';
import createIsFetchingReducer from './createIsFetchingReducer';
import createErrorMessageReducer from './createErrorMessageReducer';
import {combineReducers} from 'redux';


const idsReducer = (prevState=[], action) => {
  switch(action.type){
    case Constants.FETCH_TODOS_SUCCESS:
      if(action.data.filter === 'all' && prevState.length === 0){
        return action.data.todos.map(eachTodo => eachTodo.id);
      }
      else 
        return prevState;

    case Constants.ADD_TODO_SUCCESS:  
      return [...prevState, action.data.id];

    case Constants.TOGGLE_TODO_SUCCESS:  
      return prevState;

    case Constants.DELETE_TODO_SUCCESS:
      return TodoHelpers.deleteTodoIndexAtIndex(prevState, action.data.id);
    default: 
      break;  
  }
  return prevState;
}


const allReducer = combineReducers({
  ids: idsReducer,
  isFetching: createIsFetchingReducer('all'),
  errorMessage: createErrorMessageReducer('all')
});
export default allReducer;
