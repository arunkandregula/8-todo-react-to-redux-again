import {createStore} from 'redux';
import storeReducer from '../reducers/storeReducer';

function getDispatchWithLogging(store){
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

const getDispatchWithPromiseSupport = (store)=>{
  const rawDispatch = store.dispatch;

  return (action)=>{
    if(typeof action.then === 'function'){
      return action.then(rawDispatch);
    }
    return rawDispatch(action);
  }

}

function configureStore(){
  let store = createStore(storeReducer);  

  if(process.env.NODE_ENV !== 'production'){
    store.dispatch = getDispatchWithLogging(store);
  }  

  store.dispatch = getDispatchWithPromiseSupport(store);

  return store;
}

let store = configureStore();

export default {
  getStore(){
    return store;
  }
}
