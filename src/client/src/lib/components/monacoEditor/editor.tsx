import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';

interface Props {
  onChange: Function
  value: string
}

interface State {
  code: any
}

export default class Editor extends Component<Props, State> {

  constructor(props:Props) {
    super(props);
    this.state = {
      code: this.props.value,
    }
  }

  editorDidMount(editor:any, monaco: any) {
    console.log('editorDidMount', editor);
    editor.focus();
  }

  onChange(newValue:any, e:any) {
    console.log('onChange', newValue, e);
    //this.props.onChange(e);
  }

  render() {
    const code = this.state.code;
    
    const options = {
      selectOnLineNumbers: true,
      minimap: {enabled: false}
    };
    return (
      <MonacoEditor
        width="100%"
        height="300"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
    );
  }

}
