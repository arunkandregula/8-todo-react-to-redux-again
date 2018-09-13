import React from 'react';
import TodoList from './TodoList';
import ActionCreators from '../../../actions/ActionsCreator';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as fromStoreReducer from '../../../reducers/storeReducer';

const mapStateToProps = (state, ownProps)=>{
  const filter = ownProps.params.filter || 'all';
  return {
    todos: fromStoreReducer.getFilteredList(state, filter),
    filter,
    isFetching: fromStoreReducer.getIsFetching(state, filter),
    errorMessageOnTab: fromStoreReducer.getErrorMessageOnTab(state, filter),
  };
};


const mapDispatchToProps = (dispatch, getState)=>({
  fetchAndloadData: (filter)=>{
    return dispatch(ActionCreators.getLoadTodosThunkAction(filter));
  },
  handleToggle: (id, event) => {
    dispatch(ActionCreators.getToggleTodoThunkAction(id));
  },
  handleDelete: (id, event) => {
    dispatch(ActionCreators.getDeleteTodoThunkAction(id));
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

const ErrorMessageInTab = ({message, onRetry})=>{
  return <div className="ErrorMessageInTab">
    <p>{message}</p>
    <button onClick={onRetry}>Retry</button>
  </div>;
}

class TodoListWrapper extends React.Component{
  componentWillMount(){
    this.props.fetchAndloadData(this.props.filter).then(()=>{
        console.log(`Load data is done for ${this.props.filter} in componentWillMount`)
      });
  }
  componentWillReceiveProps(nextProps){
    if(this.props.filter !== nextProps.filter){
      this.props.fetchAndloadData(nextProps.filter).then(()=>{
        console.log(`Load data is done for ${nextProps.filter} in componentWillReceiveProps`)
      })
    }
  }
  render(){
    // only pass selected props (todos, handleToggle, handleDelete) to <TodoList>
    const {loadData, filter, isFetching, errorMessageOnTab, ...rest} = this.props;
    if(isFetching && this.props.todos.length === 0){
      return <div>Loading...</div>;
    }
    if(errorMessageOnTab != null && this.props.todos.length === 0){
      return <ErrorMessageInTab message={errorMessageOnTab} onRetry={this.props.fetchAndloadData.bind(null, filter)} />;
    }
    return <TodoList {...rest}/>;
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoListWrapper));




