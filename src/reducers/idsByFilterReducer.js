import {combineReducers} from 'redux';
import allReducer from './allReducer';
import activeReducer from './activeReducer';
import completedReducer from './completedReducer';

const idsByFilterReducer = combineReducers({
  all: allReducer,
  active: activeReducer,
  completed: completedReducer,
});

export default idsByFilterReducer;

export function getIsFetching(state, filter){
  return state[filter].isFetching;
}