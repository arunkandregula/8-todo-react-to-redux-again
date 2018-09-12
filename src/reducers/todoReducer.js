import Constants from '../constants/Constants';

const todoReducer = (prevState, action)=>{
  switch(action.type){
    case Constants.ADD_TODO_SUCCESS:
    case Constants.TOGGLE_TODO_SUCCESS:
      return action.data;
    default:
      break;  
  }
  return prevState;
}

export default todoReducer;