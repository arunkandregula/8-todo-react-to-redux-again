import React from 'react';
import classNames from 'classnames';
import './Link.css';

const Link = (props) => {

  var className = classNames({
    'Link': true,
    'active': props.isActive
  });

  return <a href="#" className={className} onClick={props.onClick}>{props.children}</a>;
}

export default Link;