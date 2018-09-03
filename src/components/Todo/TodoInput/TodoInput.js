import React from 'react';
import PropTypes from 'prop-types';

const TodoInput = (props) => {
  return  <form className="TodoInput" onSubmit={props.handleSubmit}>
            <input 
              type="text" 
              value={props.value} 
              placeholder="What needs to be done?" 
              className="main-input" 
              onChange={props.handleInputChange}
            />
          </form>;
}


TodoInput.propTypes = {
  value: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func
}

export default TodoInput;