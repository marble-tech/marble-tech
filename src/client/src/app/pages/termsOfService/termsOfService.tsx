import React, { Component } from 'react'

export default class TermsOfService extends Component {

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://consent.cookiebot.com/906a8086-e323-4d1d-bc6b-f5502aa4e320/cd.js";
    script.id = "CookieDeclaration";
    script.async = true;

    document.getElementById('TOS')!.appendChild(script);
  }

  render() {
    return (
      <React.Fragment>
        <div id='TOS'>

        </div>
      </React.Fragment>
    )
  }
}
