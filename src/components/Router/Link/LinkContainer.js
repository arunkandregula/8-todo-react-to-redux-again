import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';
import ActionCreators from '../../../actions/ActionsCreator';
import {connect} from 'react-redux';

const mapStateToProps = (state, ownProps)=>({
  isActive: ownProps.to === state.filter
})

const mapDispatchToProps = (dispatch, ownProps)=>({
  onClickDispatch(){
    //1. Avoid appending # on thwe browser bar - which is the default behavior
    

    //old: 2. We want the Link component to update the browser's address bar and history. But we dont want full page reload.
    //old: window.history.pushState(null, '', this.props.to);
    //window.history.pushState(null, '', this.props.to)
    dispatch(ActionCreators.getSetVisibilityFilterAction(ownProps.to)) 
  }
});

class LinkContainerWrapper extends React.Component {

  static contextTypes = {
    handleLinkClick: PropTypes.func
  }

  constructor(){
    super();
  }

  handleLinkClick = (event) => {
    event.preventDefault();
    //old: 3 Next option is to call the context and maintain the state of the route in it.
    this.context.handleLinkClick(this.props.to);

    // do the dispatch
    this.props.onClickDispatch();

  }
  render(){
    return <Link {...this.props} onClick={this.handleLinkClick} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkContainerWrapper);