import Constants from '../constants/Constants';

const createErrorMessageReducer = (filter) => {

  return (prevState = null, action) =>{

    if (action.data && action.data.filter !== filter){
      return prevState;
    }

    switch(action.type){
      case Constants.FETCH_TODOS_FAILURE:
          return action.data.message;
      case Constants.FETCH_TODOS_SUCCESS:
      case Constants.FETCH_TODOS_REQUEST:
        return '';
      default:
        break;  
    }
    return prevState;
  }
}

export default createErrorMessageReducer;
