import Constants from '../constants/Constants';
import v4 from 'node-uuid';

export default {
  getHandleInputChangeAction(value){
    return {
      type: Constants.CHANGE_CURRENT_TODO,
      data: value
    };
  },
  getHandleInputSubmitAction(obj){
    return {
      type: Constants.ADD_TODO,
      data: {
        id: v4(),
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
      data: { id }

    }
  },
  getHandleDeleteAction(id){
    return {
      type: Constants.DELETE_TODO,
      data: { id }
    }
  },
  getSetVisibilityFilterAction(value){
    return {
      type: Constants.SET_VISIBILITY_FILTER,
      data: value
    };
  },
  getLoadTodosAction(jsonResp){
    return {
      type: Constants.LOAD_TODOS,
      data: jsonResp
    };
  }

}