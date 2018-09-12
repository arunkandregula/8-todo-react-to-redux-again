import Constants from '../constants/Constants';

const createIsFetchingReducer = (filter) => {

  return (prevState = false, action) =>{


    switch(action.type){
      case Constants.REQUEST_TODOS:
        if (action.data.filter === filter){
          return true;
        }
        break;
      case Constants.RECEIVE_TODOS:
        if (action.data.filter === filter){
          return false;
        }
        break;
      default:
        break;  
    }
    return prevState;
  }
}

export default createIsFetchingReducer;
