import React from 'react';
import TodoList from './TodoList';
import ActionCreators from '../../../actions/ActionsCreator';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getFilteredList} from '../../../reducers/storeReducer';
import {loadTodos} from '../../../services/TodoService';

const mapStateToProps = (state, ownProps)=>{
  const filter = ownProps.params.filter || 'all';
  return {
    todos: getFilteredList(state, filter),
    filter
  };
};

const mapDispatchToProps = (dispatch, getState)=>({
  loadData: (jsonResponse, filter) => {
    dispatch(ActionCreators.getLoadTodosAction(jsonResponse, filter));
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
    this.fetchData(this.props.filter);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.filter !== nextProps.filter){
      this.fetchData(nextProps.filter);
    }
  }
  fetchData(filter){
    loadTodos(filter).then((jsonResponse)=>{
      this.props.loadData(jsonResponse, filter);
    });
  }
  render(){
    // only pass selected props (todos, handleToggle, handleDelete) to <TodoList>
    const {loadData, filter, ...rest} = this.props;
    return <TodoList {...rest} />;
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoListWrapper));




