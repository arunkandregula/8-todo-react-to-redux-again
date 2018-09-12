import Constants from '../constants/Constants';
import TodoService from '../services/TodoService';
import * as fromStoreReducer from '../reducers/storeReducer';

const ActionsCreator = {
  getHandleInputChangeAction(value){
    return {
      type: Constants.CHANGE_CURRENT_TODO,
      data: value
    };
  },
  getAddTodoThunkAction(obj){
    return (dispatch)=>{
      // Step1: Save it on the server
      return TodoService.createTodo(obj.data).then((response)=>{
        // Step2: Make state change on FE
        dispatch({
          type: Constants.ADD_TODO_SUCCESS,
          data: response
        });
      });
    }
  },
  getHandleInvalidInputSubmitAction(obj){
    return {
      type: Constants.SHOW_ERROR_MSG,
      data: obj.data
    };
  },
  getToggleTodoThunkAction(todo){
    return (dispatch)=>{
      // Step1: Save it on the server
      return TodoService.toggleTodo(todo).then((response)=>{
        // Step2: Make state change on FE
        dispatch({
          type: Constants.TOGGLE_TODO_SUCCESS,
          data: response
        });
      });
    }
  },
  getDeleteTodoThunkAction(id){

    return (dispatch)=>{
      // Step1: Delete it on the server
      return TodoService.deleteTodo(id).then((response)=>{
        // Step2: Make state change on FE
        dispatch({
          type: Constants.DELETE_TODO_SUCCESS,
          data: {
            id: response
          }
        });
      });
    }
  },
  getSetVisibilityFilterAction(value){
    return {
      type: Constants.SET_VISIBILITY_FILTER,
      data: value
    };
  },
  getLoadTodosAction(jsonResp, filter){
    return {
      type: Constants.RECEIVE_TODOS,
      data: {
        todos: jsonResp,
        filter
      }
    };
  },
  getRequestTodosAction(filter){
    return {
      type: Constants.REQUEST_TODOS,
      data: {
        filter
      }
    };
  },
  getLoadTodosThunkAction(filter){
    return (dispatch, getState)=>{

      if(fromStoreReducer.getIsFetching(getState(), filter)){
        // or just return if we dont intend to listen to the returning promise.
        return Promise.resolve();
      }

      // Step 1
      dispatch(ActionsCreator.getRequestTodosAction(filter));

      // Step2
      return TodoService.loadTodos(filter).then((jsonResponse)=>{
        dispatch(ActionsCreator.getLoadTodosAction(jsonResponse, filter));
      });

    }
  }

}

export default ActionsCreator;