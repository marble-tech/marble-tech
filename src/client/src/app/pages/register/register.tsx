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
        // console.log(this.props)
        const {history}:any = this.props
        return (
            <Container fluid className="bg-light px-0">
                <Hero><Signup history={history}/></Hero>
                <Container fluid >
                    <Section>
                        <Col className="text-center">
                            <Image src="./images/profileImage.svg" roundedCircle className="mb-3"/>
                            <h3>Fernando Marinho</h3>
                            <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                        </Col>
                        <Col className="text-center">
                            <Image src="./images/profileImage.svg" roundedCircle className="mb-3" />
                            <h3>Gustavo Lessa</h3>
                            <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                        </Col>
                        <Col className="text-center">
                            <Image src="./images/profileImage.svg" roundedCircle className="mb-3"/>
                            <h3>Lucival</h3>
                            <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                        </Col>
                        <Col className="text-center">
                            <Image src="./images/profileImage.svg" roundedCircle className="mb-3"/>
                            <h3>Rafael Barros</h3>
                            <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                        </Col>
                    </Section>
                </Container>
            </Container>
        )
    }
}