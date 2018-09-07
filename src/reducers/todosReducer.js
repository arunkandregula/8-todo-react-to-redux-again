import byIdsReducer from './byIdsReducer';
import idsByFilterReducer from './idsByFilterReducer';

let defaultState = {
  byIds: {},
  allIds: []
}

let todosReducer = (prevState = defaultState, action)=>{
  return {
    byIds: byIdsReducer(prevState.byIds, action),
    idsByFilter: idsByFilterReducer(prevState.idsByFilter, action)
  };
}

export default todosReducer;

function getTodos(state){
  return state.allIds.map((eachId) => state.byIds[eachId]);
}

// We usually call these selectors becuase they select something from the state
export function getFilteredList(state, filter){
  const filterIds = state.idsByFilter[filter];
  return filterIds.map(eachId => state.byIds[eachId]);
}
