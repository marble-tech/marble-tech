import React from "react";
import { withRouter, RouteProps } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";


interface ContentProps  {
  className?:string;
}

interface ContentState {
}

export class Content extends React.Component<ContentProps, ContentState> {
  public constructor(props: ContentProps) {
    super(props);
    this.state = {
      markdown: null
    };
  }
  public render() {
      return <Container className={(this.props.className ? this.props.className: "")} fluid>

        <Row className="px-4">
        <Col> 
        {this.props.children}
        </Col>
         
        </Row>
        
      </Container>;
  }
}