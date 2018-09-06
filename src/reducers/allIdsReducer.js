import Constants from '../constants/Constants';

const allIdsReducer = (prevState = [], action)=>{
  switch(action.type){
    case Constants.LOAD_TODOS:
      const todos = action.data.map((eachTodo)=> eachTodo.id);
      debugger;
      return todos;
    case Constants.ADD_TODO:
      return [...prevState, action.data.id];
    case Constants.TOGGLE_TODO:
      return prevState;
    case Constants.DELETE_TODO:
      let index = prevState.findIndex((eachId)=>{
        return eachId === action.data.id;
      });
      return [
        ...prevState.slice(0, index),
        ...prevState.slice(index+1)
      ];
    default:
      break;  
  }
  return prevState;
}

export default allIdsReducer;