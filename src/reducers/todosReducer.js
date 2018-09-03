import {createTodo, updateTodo, deleteTodo} from '../services/TodoService';
import TodoHelpers from '../utils/todoHelpers';
import Constants from '../constants/Constants';

let defaultState = []

let todosReducer = (prevState = defaultState, action)=>{
  debugger;
  switch(action.type){
    case 'LOAD_TODOS': 
      return action.data;

    case 'DELETE_TODO':
      let todos = prevState.filter((eachTodo)=>{
        if(eachTodo.id === action.data){
          deleteTodo(eachTodo).then(()=>{
            console.log(`${eachTodo.text} got deleted.` );
          });
        }
        return eachTodo.id !== action.data
      });
      return todos;

    case 'ADD_TODO':
      let newTodo = {
        id: TodoHelpers.generateId(),
        text: action.data.text,
        isComplete: false,
      };
      // STEP1: UPDATE THE SERVER
      createTodo(newTodo).then(()=>{
        console.log('A new todo was created.')
      });

      // STEP2. UPDATE THE STORE ( becuase we will return the value, we will keep it here)
      return TodoHelpers.addTodo(prevState, newTodo);

    case Constants.TOGGLE_TODO:
      return prevState.map((eachTodo)=>{
        if(eachTodo.id === action.data){
          let toggledTodo = {...eachTodo, isComplete: !eachTodo.isComplete};

          // save on the server
          updateTodo(toggledTodo);

          return toggledTodo;
        } 
        return eachTodo;
      });

    default:
      break;  

  }
  return prevState;
}

export default todosReducer;