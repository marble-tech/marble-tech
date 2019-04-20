import React, { Component } from 'react'

interface State {
  script: any
}

interface Props {

}

export default class TermsOfService extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      script: null
    };
  }

  componentDidMount() {
    this.setState({ script: this._renderScript() })
  }

  private _renderScript() {
    return (
      <div>
        <script
          id="CookieDeclaration"
          src="https://consent.cookiebot.com/906a8086-e323-4d1d-bc6b-f5502aa4e320/cd.js"
          type="text/javascript"
          async
        ></script>
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.state.script}
      </React.Fragment>
    )
  }
}
