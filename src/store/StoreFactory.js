import {createStore} from 'redux';
import storeReducer from '../reducers/storeReducer';

function getEnhancedDispatchWithLogging(store){
  const rawDispatch = store.dispatch;

  return (action)=>{
    if(!console.group){
      return rawDispatch;
    }

    console.group(action.type);
    console.log('%c prev state:', 'color: gray', store.getState());
    console.log('%c action:', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state:','color: green', store.getState())
    console.groupEnd(action.type);
    return returnValue;
  }

}

function configureStore(){
  let store = createStore(storeReducer);  

  if(process.env.NODE_ENV !== 'production'){
    store.dispatch = getEnhancedDispatchWithLogging(store);
  }  

  return store;
}

let store = configureStore();

export default {
  getStore(){
    return store;
  }
}
