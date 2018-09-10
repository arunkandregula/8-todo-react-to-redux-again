import {createStore} from 'redux';
import storeReducer from '../reducers/storeReducer';

const getDispatchWithLogging = (store) => (nextDispatch) => (action)=>{
  if(!console.group){
    return nextDispatch;
  }

  console.group(action.type);
  console.log('%c prev state:', 'color: gray', store.getState());
  console.log('%c action:', 'color: blue', action);
  const returnValue = nextDispatch(action);
  console.log('%c next state:','color: green', store.getState())
  console.groupEnd(action.type);
  return returnValue;
}

const getDispatchWithPromiseSupport = (store) => (nextDispatch) => (action)=>{
  if(typeof action.then === 'function'){
    return action.then(nextDispatch);
  }
  return nextDispatch(action);
}

function wrapDispatchWithMiddleware(store, middleware){
  middleware.slice().forEach((eachMiddleware)=>{
    store.dispatch = eachMiddleware(store)(store.dispatch);
  });
}

function configureStore(){
  let store = createStore(storeReducer);  

  const middleware = [];
  middleware.push(getDispatchWithPromiseSupport);

  if(process.env.NODE_ENV !== 'production'){
    middleware.push(getDispatchWithLogging);
  }  
  
  console.log(middleware);
  wrapDispatchWithMiddleware(store, middleware);

  return store;
}

let store = configureStore();

export default {
  getStore(){
    return store;
  }
}
