import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import './footer.css';

export class Footer extends React.Component {
    render() {
        return (
            <Container
                id='app-footer'
                fluid
                className="bg-secondary"
                style={{ minHeight: "200px" }}
            >
                <div className="row p-5">

                    <div className="offset-1 col-sm-3 col-md-3">
                        <h6 className='center'><u>Product</u></h6>
                        <Link className='tos-link' to='/'>
                            <h6 className='tos'>Features (not implemented)</h6>
                        </Link>
                        <Link className='tos-link' to={'/termsOfService'}>
                            <h6 className='tos'>Terms of Service</h6>
                        </Link>
                    </div>

                    <div className="offset-1 col-sm-3 col-md-3">
                        <h6><u>Resources</u></h6>
                        <a className='tos-link' href='https://nodejs.org' target="_blank">
                            <h6 className='tos'>NodeJs</h6>
                        </a>
                        <a className='tos-link' href='https://expressjs.com/' target="_blank">
                            <h6 className='tos'>ExpressJs</h6>
                        </a>
                        <a className='tos-link' href='https://www.typescriptlang.org/' target="_blank">
                            <h6 className='tos'>TypeScript</h6>
                        </a>
                    </div>

                    <div className="offset-1 col-sm-3 col-md-3">
                        <h6><u>Support</u></h6>
                        <Link className='tos-link' to={'/'}>
                            <h6 className='tos'>Help (not implemented)</h6>
                        </Link>
                        <Link className='tos-link' to={'/'}>
                            <h6 className='tos'>Community Forum (not implemented)</h6>
                        </Link>
                        <Link className='tos-link' to={'/'}>
                            <h6 className='tos'>Contact Us (not implemented)</h6>
                        </Link>
                    </div>

                </div>

            </Container>
        )
    }

}