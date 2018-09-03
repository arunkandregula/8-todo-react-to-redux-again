import {createStore} from 'redux';
import storeReducer from '../reducers/storeReducer';

function configureStore(){
  let store = createStore(storeReducer);  
  return store;
}

let store = configureStore();

export default {
  getStore(){
    return store;
  }
}
