import React from 'react';
import PropTypes from 'prop-types';

function getCurrentPath(){
  let path = document.location.pathname;
  return path.substring(path.lastIndexOf("/"));
}

class Router extends React.Component{
  state = {
    route: getCurrentPath()
  }

  handleLinkClick = (newRoute, event)=>{
    // 1. change the browser url
    window.history.pushState(null, '', newRoute);

    // 2. let application react based on change of route
    this.setState({
      route: newRoute
    });
  }

  static childContextTypes = {
    route: PropTypes.string,
    handleLinkClick: PropTypes.func
  }

  getChildContext(){
    return {
      route: this.state.route,
      handleLinkClick: this.handleLinkClick
    }
  }

  componentDidMount = ()=>{
    window.onpopstate = (event)=>{
      this.setState({
        route: getCurrentPath()
      });
    }
  }

  render(){
    return <div className="Router">{this.props.children}</div>;
  }

}

export default Router;