import React from 'react';
import TodoList from './TodoList';
import ActionCreators from '../../../actions/ActionsCreator';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getFilteredList} from '../../../reducers/storeReducer';

const mapStateToProps = (state, ownProps)=>{
  const filter = ownProps.params.filter || 'all';
  return {
    todos: getFilteredList(state, filter),
    filter
  };
};


const mapDispatchToProps = (dispatch, getState)=>({
  fetchAndloadData: (filter)=>{
    dispatch(ActionCreators.getFetchAndLoadTodosPromiseAction(filter));
  },
  handleToggle: (id, event) => {
    dispatch(ActionCreators.getHandleToggleAction(id));
  },
  handleDelete: (id, event) => {
    dispatch(ActionCreators.getHandleDeleteAction(id));
  }
});


/*
const mapDispatchToProps = (dispatch, getState)=>({
  //loadData: ActionCreators.getLoadTodosAction,
  fetchAndloadData: ActionCreators.getFetchAndLoadTodosPromiseAction,
  handleToggle: ActionCreators.getHandleToggleAction,
  handleDelete: ActionCreators.getHandleDeleteAction
});

*/

class TodoListWrapper extends React.Component{
  componentWillMount(){
    this.props.fetchAndloadData(this.props.filter);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.filter !== nextProps.filter){
      this.props.fetchAndloadData(nextProps.filter);
    }
  }
  render(){
    // only pass selected props (todos, handleToggle, handleDelete) to <TodoList>
    const {loadData, filter, ...rest} = this.props;
    return <TodoList {...rest} />;
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoListWrapper));




