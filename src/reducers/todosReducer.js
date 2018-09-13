import byIdsReducer from './byIdsReducer';
import idsByFilterReducer from './idsByFilterReducer';
import * as fromIdsByFilterReducer from './idsByFilterReducer';

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

// We usually call these selectors becuase they select something from the state
export function getFilteredList(state, filter){
  const filterIdsObj = state.idsByFilter[filter];
  return filterIdsObj.ids.map(eachId => state.byIds[eachId]);
}

export function getIsFetching(state, filter){
  return fromIdsByFilterReducer.getIsFetching(state.idsByFilter, filter);
}

export function getErrorMessageOnTab(state, filter){
  return fromIdsByFilterReducer.getErrorMessageOnTab(state.idsByFilter, filter);
}
