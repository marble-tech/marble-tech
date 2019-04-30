import React from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { Hero } from '../../../lib/components/hero/hero';
import { Section } from '../../../lib/components/section/section';
import Col from 'react-bootstrap/Col';
import { Row, Card } from 'react-bootstrap';
import { Login } from '../../../lib/components';

export class LoginPage extends React.Component {
    render() {

        const { history }: any = this.props;
        return (
            <Container fluid className="bg-light px-0">
                <Hero fluid>
                    <Row className="align-items-center h-100">
                    <Col sm={5} className="m-auto">
                       <Card className="pt-5 pb-3 px-4" style={{background: "rgba(255,255,255,0.5)"}}>
                           <Login history={history}></Login>
                       </Card> 
                    </Col>
                    </Row>
                </Hero>
                <Container fluid className="bg-light">
                    <Section>
                        <Col>
                            <h3 >Stephen Hawking</h3>
                            <p>
                              "Whether you want to uncover the secrets of the universe, or you just want to pursue a
                              career in the 21st century, basic computer programming is an essential skill to learn.”
                            </p>
                        </Col>
                        <Col>
                            <h3 >Steve Jobs</h3>
                            <p>
                              “Everybody should learn to program a computer, because it teaches you how to think.”
                            </p>
                        </Col>
                        <Col>
                            <h3 >Benjamin Franklin</h3>
                            <p>
                              “Tell me and I forget, teach me and I may remember, involve me and I learn.”
                        </p>
                        </Col>
                    </Section>
                    <Section noGutters>
                        <Col className="text-center">
                            <h2 >Lorem Ipsum</h2>
                            <p>
                              Lorem Ipsum
                            </p>
                        </Col>
                    </Section>
                    <Section>
                        <Col className="text-center">
                            <Image src="./images/fer.jpeg" width={171} height={180} roundedCircle className="mb-3" />
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
                            <Image src="./images/luc.jpeg" width={171} height={180} roundedCircle className="mb-3" />
                            <h3>Lucival Nascimento</h3>
                            <p>
                              Full-stack developer dived in the world of FinTech Start-ups and never left.
                              IT undergraduate at CCT College Dublin.
                            </p>
                        </Col>
                        <Col className="text-center">
                            <Image src="./images/rafa.jpeg" width={171} height={180} roundedCircle className="mb-3" />
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