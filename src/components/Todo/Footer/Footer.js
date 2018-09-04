import React from 'react';
import {LinkContainer} from '../../Router';
import './Footer.css'

const Footer = (props)=>{
  return <div className="Footer">
    <LinkContainer to="/">All</LinkContainer>
    <LinkContainer to="/active">Active</LinkContainer>
    <LinkContainer to="/completed">Completed</LinkContainer>
  </div>;
}

export default Footer;