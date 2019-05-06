import React from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { Section } from '../../../lib/components/section/section';

import { withRouter } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import { Hero } from '../../../lib/components/hero/hero';
import { Signup } from '../../../lib/components';
import { Row, Card } from 'react-bootstrap';

export class Register extends React.Component{
    render(){
        const {history}:any = this.props
        return (
            <Container fluid className="bg-light px-0">
                <Hero fluid>
                    <Row className="align-items-center h-100">
                    <Col sm={5} className="m-auto">
                       <Card className="pt-5 pb-3 px-4" style={{background: "rgba(255,255,255,0.5)"}}>
                            <Signup history={history}/>
                       </Card> 
                    </Col>
                    </Row>
                </Hero>
                <Container fluid >
                <Section>
                        <Col className="text-center">
                            <Image src="./images/fer.jpeg" width={171} height={180} roundedCircle className="mb-3" />
                            <h3><a href="https://www.linkedin.com/in/fernandomarinhosilva/"  target="_blank">Fernando Marinho</a></h3>
                            <p>
                              Fullstack developer passionate about helping others students 
                              on the path of developing their IT skills. IT undergraduate at CCT College Dublin
                            </p>
                        </Col>
                        <Col className="text-center">
                            <Image src="./images/gus.jpeg" width={171} height={180} roundedCircle className="mb-3" />
                            <h3><a href="https://www.linkedin.com/in/gustavolessa23/"  target="_blank">Gustavo Lessa</a></h3>
                            <p>
                              Software developer and problem solver, focused in java and backend technologies. IT undergraduate at CCT College Dublin.
                            </p>
                        </Col>
                        <Col className="text-center">
                            <Image src="./images/luc.jpeg" width={171} height={180} roundedCircle className="mb-3" />
                            <h3><a href="https://www.linkedin.com/in/lucival-nascimento/"  target="_blank">Lucival Nascimento</a></h3>
                            <p>
                              Full-stack developer dived in the world of FinTech Start-ups and never left.
                              IT undergraduate at CCT College Dublin.
                            </p>
                        </Col>
                        <Col className="text-center">
                            <Image src="./images/rafa.jpeg" width={171} height={180} roundedCircle className="mb-3" />
                            <h3><a href="https://www.linkedin.com/in/rbsrafa/"  target="_blank">Rafael Barros</a></h3>
                            <p>
                              Software development enthusiastic and author of <a target="_blank" href='https://rbsprogramming.com'>
                              rbsprogramming.com</a> tutorials blog. IT undergraduate at CCT College Dublin.
                            </p>
                        </Col>
                    </Section>
                </Container>
            </Container>
        )
    }
}