import React from 'react';
import {Link} from '../../Router';
import './Footer.css'

const Footer = (props)=>{
  return <div className="Footer">
    <Link to="/">All</Link>
    <Link to="/active">Active</Link>
    <Link to="/completed">Completed</Link>
  </div>;
}

export default Footer;