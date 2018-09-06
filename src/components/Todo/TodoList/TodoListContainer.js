import React from 'react';
import TodoList from './TodoList';
import ActionCreators from '../../../actions/ActionsCreator';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getFilteredList} from '../../../reducers/storeReducer';
import {loadTodos} from '../../../services/TodoService';

const mapStateToProps = (state, ownProps)=>({
  todos: getFilteredList(state, ownProps.params.filter || 'all')
});

const mapDispatchToProps = (dispatch, getState)=>({
  loadData: (jsonResponse) => {
    dispatch(ActionCreators.getLoadTodosAction(jsonResponse));
  },
  handleToggle: (id, event) => {
    dispatch(ActionCreators.getHandleToggleAction(id));
  },
  handleDelete: (id, event) => {
    dispatch(ActionCreators.getHandleDeleteAction(id));
  }

});

class TodoListWrapper extends React.Component{
  componentWillMount(){
    loadTodos().then((jsonResponse)=>{
      this.props.loadData(jsonResponse);
    });
  }
  render(){
    return <TodoList {...this.props} />;
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoListWrapper));




