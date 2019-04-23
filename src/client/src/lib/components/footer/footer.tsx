import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import './footer.css';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

export class Footer extends React.Component {
    render() {
        return (
            <Container
                id='app-footer'
                fluid
                className="row no-gutters p-0"
                style={{ minHeight: "200px", backgroundColor:"#757575" }}
            >
                <Container style={{}}>
                    <div className="row py-5">

                    <Col sm={3} className='mx-auto'>
                        <h5 className='border-bottom px-2 py-1 mb-3 text-white' ><strong>Product</strong></h5>
                        <Link className='tos-link' to='/'>
                            <h6 className='tos'>Features (not implemented)</h6>
                        </Link>
                        <Link className='tos-link' to={'/termsOfService'}>
                            <h6 className='tos'>Terms of Service</h6>
                        </Link>
                    </Col>

                    <Col sm={3} className='mx-auto'>
                    <h5 className='border-bottom px-2 py-1 mb-3 text-white' ><strong>Resources</strong></h5>
                        <a className='tos-link' href='https://nodejs.org' target="_blank">
                            <h6 className='tos'>NodeJs</h6>
                        </a>
                        <a className='tos-link' href='https://expressjs.com/' target="_blank">
                            <h6 className='tos'>ExpressJs</h6>
                        </a>
                        <a className='tos-link' href='https://www.typescriptlang.org/' target="_blank">
                            <h6 className='tos'>TypeScript</h6>
                        </a>
                    </Col>

                    <Col sm={3} className='mx-auto'>
                        <h5 className='border-bottom px-2 py-1 mb-3 text-white' ><strong>Support</strong></h5>
                        <Link className='tos-link' to={'/'}>
                            <h6 className='tos'>Help (not implemented)</h6>
                        </Link>
                        <Link className='tos-link' to={'/'}>
                            <h6 className='tos'>Community Forum (not implemented)</h6>
                        </Link>
                        <Link className='tos-link' to={'/'}>
                            <h6 className='tos'>Contact Us (not implemented)</h6>
                        </Link>
                    </Col>

                    </div>
                </Container>
                <Container fluid 
                 className='py-2'
                 style={{backgroundColor:"#424242", color:"white" }}>
                    <Container>
                        <Row className='align-items-center'>
                            <Col sm={3} className='m-auto text-center'>
                                <p className='m-0'>© Copyright 2019 Marble Tech</p>
                            </Col>
                            <Col sm={3} className='m-auto text-center'>
                                <a className="text-white" href="https://github.com/marble-tech/marble-tech"><i className="fab fa-github fa-2x tos-link"></i></a>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </Container>
        )
    }

}