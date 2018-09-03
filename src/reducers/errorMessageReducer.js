let defaultState = []

let currentTodoReducer = (prevState = defaultState, action)=>{
  switch(action.type){
    case 'SHOW_ERROR_MSG':
      return action.data;
    case 'ADD_TODO':
      return '';
    default:
      break;  
  }

  return prevState;
}

export default currentTodoReducer;