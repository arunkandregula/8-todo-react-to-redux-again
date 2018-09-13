import todoReducer from './todoReducer';
import Constants from '../constants/Constants';

const byIdsReducer = (prevState = {}, action)=>{
  switch(action.type){
    //case 'LOAD_TODOS': 
    //  return action.data;
    case Constants.ADD_TODO_SUCCESS:  
    case Constants.TOGGLE_TODO_SUCCESS:  
      return {
        ...prevState,
        [action.data.id]: todoReducer(prevState[action.data.id], action)
      };

    case Constants.DELETE_TODO_SUCCESS:
      delete prevState[action.data.id]
      break;
    
    case Constants.FETCH_TODOS_SUCCESS:
      const map = {...prevState};
      action.data.todos.forEach((eachTodo)=> {
        map[eachTodo.id] = eachTodo;
      });
      return map;
    default:
      break;  
  }
  return prevState;
};

export default byIdsReducer;

