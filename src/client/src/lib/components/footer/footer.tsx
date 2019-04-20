import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import './footer.css';

export class Footer extends React.Component{
    render(){
        return (
            <Container id='app-footer' fluid className="bg-secondary" style={{minHeight:"200px"}}>
                <Link to={'/termsOfService'}><h6 className='tos'>Terms of Service</h6></Link>
            </Container>
        )
    }

}