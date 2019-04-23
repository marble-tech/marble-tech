import React from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { Section } from '../../../lib/components/section/section';

import { withRouter } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import { Hero } from '../../../lib/components/hero/hero';
import { Signup } from '../../../lib/components';

export class Register extends React.Component{
    render(){
        const {history}:any = this.props
        return (
            <Container fluid className="bg-light px-0">
                <Hero><Signup history={history}/></Hero>
                <Container fluid >
                    <Section>
                        <Col className="text-center">
                            <Image src="./images/fer.jpeg" width={171} height={180} roundedCircle className="mb-3"/>
                            <h3>Fernando Marinho</h3>
                            <p>
                              IT undergraduate at CCT College Dublin.
                            </p>
                        </Col>
                        <Col className="text-center">
                            <Image src="./images/gus.jpeg" width={171} height={180} roundedCircle className="mb-3" />
                            <h3>Gustavo Lessa</h3>
                            <p>
                              IT undergraduate at CCT College Dublin.
                            </p>
                        </Col>
                        <Col className="text-center">
                            <Image src="./images/luc.jpeg" width={171} height={180} roundedCircle className="mb-3"/>
                            <h3>Lucival Nascimento</h3>
                            <p>
                              Full-stack developer dived in the world of FinTech Start-ups and never left.
                              IT undergraduate at CCT College Dublin.
                            </p>
                        </Col>
                        <Col className="text-center">
                            <Image src="./images/rafa.jpeg" width={171} height={180} roundedCircle className="mb-3"/>
                            <h3>Rafael Barros</h3>
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