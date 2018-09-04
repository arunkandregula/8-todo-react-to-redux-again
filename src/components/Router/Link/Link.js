import React from 'react';
import './Link.css';

const Link = (props) => {
  return <a href="#" className={props.className} onClick={props.onClick}>{props.children}</a>;
}

export default Link;