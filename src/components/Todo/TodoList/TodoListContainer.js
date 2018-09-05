import TodoList from './TodoList';
import ActionCreators from '../../../actions/ActionsCreator';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

function getFilteredList(todos, filter){
  switch(filter){
    case 'active': 
      return todos
        .filter((eachTodo)=>{
          return !eachTodo.isComplete;
        })
    case 'completed': 
      return todos
        .filter((eachTodo)=>{
          return eachTodo.isComplete;
        })
    default:
      break;
  }
  return todos;
}

const mapStateToProps = (state, ownProps)=>({
  todos: getFilteredList(state.todos, ownProps.params.filter || 'all')
});

const mapDispatchToProps = (dispatch, getState)=>({
  handleToggle: (id, event) => {
    dispatch(ActionCreators.getHandleToggleAction(id));
  },
  handleDelete: (id, event) => {
    dispatch(ActionCreators.getHandleDeleteAction(id));
  }

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoList));




