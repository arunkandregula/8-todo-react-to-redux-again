import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Link.css';

class Link extends React.Component{

  static contextTypes = {
    route: PropTypes.string,
    handleLinkClick: PropTypes.func
  }


  handleClick = (event)=>{
    //1. Avoid appending # on thwe browser bar - which is the default behavior
    event.preventDefault();

    //old: 2. We want the Link component to update the browser's address bar and history. But we dont want full page reload.
    //old: window.history.pushState(null, '', this.props.to);
    //window.history.pushState(null, '', this.props.to)

    //old: 3 Next option is to call the context and maintain the state of the route in it.
    this.context.handleLinkClick(this.props.to);



  }
  render(){
    var className = classNames({
      'Link': true,
      'active': this.props.to === this.context.route
    });
    return <a href="#" className={className} onClick={this.handleClick}>{this.props.children}</a>;
  }
}

export default Link;