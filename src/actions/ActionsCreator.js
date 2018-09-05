import Constants from '../constants/Constants';

export default {
  getHandleInputChangeAction(value){
    return {
      type: Constants.CHANGE_CURRENT_TODO,
      data: value
    };
  },
  getHandleInputSubmitAction(obj){
    debugger;
    return {
      type: Constants.ADD_TODO,
      data: {
        text: obj.data
      }
    };
  },
  getHandleInvalidInputSubmitAction(obj){
    return {
      type: Constants.SHOW_ERROR_MSG,
      data: obj.data
    };
  },
  getHandleToggleAction(id){
    return {
      type: Constants.TOGGLE_TODO,
      data: id
    }
  },
  getHandleDeleteAction(id){
    return {
      type: Constants.DELETE_TODO,
      data: id
    }
  },
  getSetVisibilityFilterAction(value){
    return {
      type: Constants.SET_VISIBILITY_FILTER,
      data: value
    };
  }

}