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
                            <h4 className="text-center">Challenging</h4>
                            <p className="lead text-center pt-2">
                                Exercise through activities with the right level of complexity and make your progress consistent 
                            </p>
                        </Col>
                        <Col className="pr-2">
                            <h4 className="text-center" >Learns as you go!</h4>
                            <p className="lead text-center pt-2">
                              Practice API concepts on your own time with many challenges designed to help you develop your skillset
                            </p>
                        </Col>
                        <Col className="pr-2">
                            <h4 className="text-center">Top trending technolgies</h4>
                            <p className="lead text-center pt-2">
                              Learn more about top backend technologies like, NodeJS, ExpressJS and Typescript.
                            </p>
                        </Col>
                    </Section>
                    <Section noGutters>
                        <Col className="text-center">
                            <h2 >About us</h2>
                            <p className="lead text-center pt-2">
                                Marble Tech is a project created by students for students to help, support and promote 
                                the learning of server side technology such as NodeJS, ExpressJS and others all using Typescript. Marble is composed 
                                of two main features: a tutorial of how to build a server and a sequence of practical 
                                challenges for learners that are willing to improve their knowledge about the subject.
                            </p>
                        </Col>
                    </Section>
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