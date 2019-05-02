import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

interface TutorialProps{
    location?: any
}

export class NotFound extends React.Component<TutorialProps>{
    render(){
         const {location} = this.props
        return (
            <Container fluid >
                <Row className="align-items-center" style={{minHeight:"600px"}}>
                <Col md={4} className="px-3 m-auto text-center">
                    <h1 className="text-primary" style={{fontSize:"8em"}} >4<i className="fas fa-bug px-2"></i>4</h1>
                    <h1 >Page not found</h1>
                    <p className="lead">We're sorry, the page requested could not 
                        be found or the page has been removed
                    </p>
                    <Link to="/" className="btn btn-primary text-white">Home Page</Link>
                </Col>
                </Row>
            </Container>
        )
    }
}
