import todoReducer from './todoReducer';
import Constants from '../constants/Constants';

const byIdsReducer = (prevState = {}, action)=>{
  switch(action.type){
    //case 'LOAD_TODOS': 
    //  return action.data;
    case Constants.ADD_TODO:
    case Constants.TOGGLE_TODO:
      prevState[action.data.id] = todoReducer(prevState[action.data.id], action)
      break;

    case Constants.DELETE_TODO:
      todoReducer(prevState[action.data.id], action)
      delete prevState[action.data.id]
      break;
    
    case Constants.LOAD_TODOS:
      const map = {...prevState};
      action.data.forEach((eachTodo)=> {
        map[eachTodo.id] = eachTodo;
      });
      debugger;
      return map;
    default:
      break;  
  }
  return prevState;
};

export default byIdsReducer;

