import React from 'react';
import PropTypes from 'prop-types';


class TodoInput extends React.Component {

  handleSubmit = (event)=>{
    console.log(this.refs.inputNode.value );
    event.preventDefault();
    if( this.refs.inputNode.value === "" ){
      this.props.handleInvalidInputSubmit();
    } else {
      this.props.handleInputSubmit( this.refs.inputNode.value );
    }
  }

  render(){
    return  <form className="TodoInput" onSubmit={this.handleSubmit}>
              <input 
                type="text" 
                value={this.props.value} 
                placeholder="What needs to be done?" 
                className="main-input" 
                onChange={this.props.handleInputChange}
                ref="inputNode" 
              />
              <span className="'errorMsg'">{this.props.errorMessage}</span>
            </form>;
  }
}
export default TodoInput;