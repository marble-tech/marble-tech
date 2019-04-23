import React, { Component } from "react";
import { withRouter } from "react-router";


interface ScrollToTopProps{
    history?:any;
    location?:any;
    match?:any;
}

class ScrollToTop extends Component<ScrollToTopProps,{}> {
    constructor(props:ScrollToTopProps){
        super(props)
    }

    componentDidUpdate(prevProps:any) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        window.scrollTo(0, 0);
      }
    }
  
    render() {
      return this.props.children;
    }
  }
  
  export default withRouter(props => <ScrollToTop {...props}/>, );