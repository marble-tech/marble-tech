import React from 'react';
import './hero.css'
import Card from 'react-bootstrap/Card';
import {Login} from '../';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class Hero extends React.Component{
    render(){
        return(
            <Container fluid className="pb-5 px-0 position-relative">
                <div id="moon" className="bg-winter d-flex"></div>
                <Container fluid={ window.innerWidth < 992 ? true : false}>
                    <Card style={{zIndex:1}}>
                    <Row className="">
                        <Col><img className="m-auto d-block img-fluid" src="/images/marble.png" alt=""/></Col>
                        <Col>                           
                            {this.props.children}
                        </Col>                    
                    </Row>
                    </Card>
                </Container>
                
            </Container>  
            
        )
    }
}