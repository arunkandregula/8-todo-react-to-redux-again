import {createStore, applyMiddleware} from 'redux';
import storeReducer from '../reducers/storeReducer';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

/*
const thunkMiddleware = (store) => (nextDispatch) => (action) => 
  typeof action === 'function'? action(nextDispatch, store.getState) : nextDispatch(action);
*/

function configureStore(){
  const middleware = [];
  middleware.push(thunk);
  if(process.env.NODE_ENV !== 'production'){
    middleware.push(createLogger);
  }  
  console.log(middleware);

  let store = createStore(
    storeReducer,
    applyMiddleware(...middleware)
  );  
  return store;
}

let store = configureStore();

export default {
  getStore(){
    return store;
  }
}
