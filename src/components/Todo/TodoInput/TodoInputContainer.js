import {connect} from 'react-redux';
import TodoInput from './TodoInput';
import ActionCreators from '../../../actions/ActionsCreator';


const mapStateToProps = (state)=>({
  value: state.currentTodo,
  errorMessage: state.errorMessage
});

const mapDispatchToProps = (dispatch)=>({
  handleInputChange: (event)=>{
    dispatch(ActionCreators.getHandleInputChangeAction(event.target.value));
  },

  handleInputSubmit: (value)=>{
    dispatch(ActionCreators.getAddTodoThunkAction({
      data: value
    }));
  },

  handleInvalidInputSubmit: ()=>{
    dispatch(ActionCreators.getHandleInvalidInputSubmitAction({
      data: 'Todo Item cannot be empty'
    }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);