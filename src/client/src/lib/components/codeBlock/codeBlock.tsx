import React from 'react'
import ReactDOM from 'react-dom'
import hljs from 'highlight.js'
import 'highlight.js/styles/tomorrow-night.css';
import './codeBlock.css'

var typescript = require("highlight.js/lib/languages/typescript");
var bash = require("highlight.js/lib/languages/bash");
var jsonLanguage = require("highlight.js/lib/languages/json");
var shell = require("highlight.js/lib/languages/shell");

hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('json', jsonLanguage)
hljs.registerLanguage('shell', shell)
hljs.configure({
  languages: ['ts', 'shell', 'bash', 'json']
})
export class CodeBlock extends React.PureComponent {

  componentDidMount(){
    let current = ReactDOM.findDOMNode(this)
    hljs.highlightBlock(current as Node)
  }

  render() {
    let { children } = this.props
    return (
      <pre className="rounded-lg py-3 px-4 mb-4">
        <code >
          {children}
        </code>
      </pre>
    )
  }
}