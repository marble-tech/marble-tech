import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { CodeBlock } from '../codeBlock/codeBlock';

interface Props{
    error:string;
}

interface State {}

export class CompilerError extends Component<Props, State>{
    constructor(props:Props){
        super(props)
    }
    
    render(){
        return (
            <Row className="pb-4">
            <Col className="m-auto p-3 shadow-sm" sm={4} style={{borderTop: "4px solid red"}}>
                <div>
                    <h4 className="pb-2 border-bottom"><i className="fas fa-exclamation-triangle pr-4" style={{color:"yellow"}}></i>Compiler Error</h4>
                    <p>This means that the program failed to compile, it could happen for many reasons.</p>
                    <ul>
                        <li>your spelling;</li>
                        <li>if you closed every brackets or quotes;</li>
                        <li>if you are using the availables variables.</li>
                    </ul>
                    <p>Console:</p>
                    <CodeBlock>{this.props.error}</CodeBlock>
                </div>
            </Col>
            </Row>
            
        )
    }
}