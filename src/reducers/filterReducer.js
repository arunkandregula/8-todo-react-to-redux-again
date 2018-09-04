let defaultState = []

let filterReducer = (prevState = defaultState, action)=>{
  switch(action.type){
    case 'SET_VISIBILITY_FILTER':
      return action.data;
    default:
      break;  
  }
  return prevState;
}

export default filterReducer;