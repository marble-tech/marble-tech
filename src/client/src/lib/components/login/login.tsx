import React from "react";
import Row from "react-bootstrap/Row";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';

export class Login extends React.Component {
    public render() {
        return (
            <Row className="align-items-center h-100 pr-4">
                <Col><h1>Sign in</h1>
                <Form className="my-3">
                    <Form.Group>
                        <Form.Control
                            type="email"
                            id="email"
                            placeholder="name@example.com" 
                            // value={this.state.email} 
                            // onChange={this._handleEmailChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control 
                            type="PASSWORD" 
                            id="password"
                            // value={this.state.password} 
                            // onChange={this._handlePasswordChange}
                        />
                    </Form.Group>
                    
                    <Button style={{width:'155px'}}
                        type="button" 
                        // onClick={this._userLogin}
                    >SING IN</Button>
                    <h6 className="mt-5 text-center">Don't have an account? <Link to="/register">Register here</Link></h6>
    
                </Form>

                </Col>
                
                
            </Row>
        );
    }
}