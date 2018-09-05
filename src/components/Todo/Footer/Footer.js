import React from 'react';
import {Link} from 'react-router';
import './Footer.css'

const Footer = (props)=>{
  let activeStyle = {
    textDecoration: 'none',
    color: 'black',
    fontWeight: 'bold'
  };

  return <div className="Footer">
    <Link to="/" activeStyle={activeStyle}>All</Link>
    <Link to="/active" activeStyle={activeStyle}>Active</Link>
    <Link to="/completed" activeStyle={activeStyle}>Completed</Link>
  </div>;
}

export default Footer;