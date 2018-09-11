import {createStore, applyMiddleware} from 'redux';
import storeReducer from '../reducers/storeReducer';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

function configureStore(){
  
  const middleware = [];
  middleware.push(promise);

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
