import React, { Component } from 'react'

export default class TermsOfService extends Component {

  componentDidMount(){
    const script = document.createElement("script");
    script.src = "https://consent.cookiebot.com/a01b2eb7-0b0b-403a-98af-2d7bfd8c8f2c/cd.js";
    script.id = "CookieDeclaration";
    script.async = true;
    document.head.appendChild(script);
  }

  render() {
    return (
      <React.Fragment>
        
      </React.Fragment>
    )
  }
}
