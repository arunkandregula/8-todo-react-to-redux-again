import byIdsReducer from './byIdsReducer';
import allIdsReducer from './allIdsReducer';

let defaultState = {
  byIds: {},
  allIds: []
}

let todosReducer = (prevState = defaultState, action)=>{
  return {
    byIds: byIdsReducer(prevState.byIds, action),
    allIds: allIdsReducer(prevState.allIds, action)
  };
}

export default todosReducer;

function getTodos(state){
  return state.allIds.map((eachId) => state.byIds[eachId]);
}

// We usually call these selectors becuase they select something from the state
export function getFilteredList(state, filter){
  const todos = getTodos(state);

  switch(filter){
    case 'active': 
      return todos
        .filter((eachTodo)=>{
          return !eachTodo.isComplete;
        })
    case 'completed': 
      return todos
        .filter((eachTodo)=>{
          return eachTodo.isComplete;
        })
    default:
      break;
  }
  return todos;
}
