import TodoList from './TodoList';
import ActionCreators from '../../../actions/ActionsCreator';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getFilteredList} from '../../../reducers/storeReducer';

const mapStateToProps = (state, ownProps)=>({
  todos: getFilteredList(state, ownProps.params.filter || 'all')
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




