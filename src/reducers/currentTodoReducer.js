import Constants from '../constants/Constants';

let defaultState = []

let currentTodoReducer = (prevState = defaultState, action)=>{
  switch(action.type){
    case Constants.ADD_TODO_SUCCESS:
      return '';
    case Constants.CHANGE_CURRENT_TODO:
      // STEP1: NO NEED TO UPDATE THE SERVER
      // createTodo(action.data);

      // STEP2. UPDATE THE STORE ( becuase we will return the value, we will keep it here)
      return action.data;
    default:
      break;  
  }
  return prevState;
}

export default currentTodoReducer;