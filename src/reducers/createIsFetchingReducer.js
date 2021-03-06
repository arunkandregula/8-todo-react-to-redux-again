import Constants from '../constants/Constants';

const createIsFetchingReducer = (filter) => {

  return (prevState = false, action) =>{

    if (action.data && action.data.filter !== filter){
      return prevState;
    }

    switch(action.type){
      case Constants.FETCH_TODOS_REQUEST:
          return true;
      case Constants.FETCH_TODOS_SUCCESS:
      case Constants.FETCH_TODOS_FAILURE:
        return false;
      default:
        break;  
    }
    return prevState;
  }
}

export default createIsFetchingReducer;
