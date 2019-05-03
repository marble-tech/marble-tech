import React, { CSSProperties } from 'react';
import './hero.css'
import Card from 'react-bootstrap/Card';
import {Login} from '../';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface Props{
    fluid?: boolean;
}
interface State{}

export class Hero extends React.Component<Props, State>{
    render(){
        return(
            <Container fluid className="pb-5 px-0 position-relative " style={{zIndex:0, overflow: "hidden", height: "700px"}}>
                <Container fluid={this.props.fluid} className="h-100"> 
                    <Row className="h-100">
                        <p className="p-1 h6 m-0"style={{zIndex: 100, position: "absolute",bottom: 0}}>Stock footage provided by Videvo, downloaded from https://www.videvo.net</p>
                            <div>
                                <video className="videoBg" autoPlay muted loop>
                                    <source src="./hero.mp4"></source>
                                </video>
                               
                            </div>
                            <Container className="align-items-center h-100" style={{zIndex:1}}>
                            {this.props.children}
                            </Container>
                    </Row>
                </Container>
            </Container>  
            
        )
    }
}
