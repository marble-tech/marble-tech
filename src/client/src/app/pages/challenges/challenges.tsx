import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
import { Content } from "../../../lib/components";
import { postsRoutes } from "../../config/posts-routing";
import { Route, Link } from 'react-router-dom';
import { Sidebar } from '../../../lib/components/sidebar/sidebar';
import Button from 'react-bootstrap/Button';

interface RouteConf {
    title: string;
    path: string;
}

interface ChallengesProps{
    location?: any
}

export class Challenges extends React.Component<ChallengesProps>{

    private _handleChange(event:any){
        event.preventDefault()
        const target = event.target;
        const value = (target.type === 'checkbox' ? target.checked : target.value) as string;
        const name = target.name as string;
        this.setState({[name]: value});
       
    }
    private _handleSubmit(){
        let t = `app.get(\"/\", (req, res) => {
            res.send(\"This is the home page\!\");
        });`;
        // let t = `texto`;
        // let res;
        let responseJ;
        (async()=>{
            let res = await (async()=>{
                await fetch("http://localhost:3000/chal",{
                    method:'POST',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({t:t})
                }).then((response:any) => { return response.json()})
            })()
            console.log(res);
        })()        
    }
    render(){
        return (
            <Container fluid>
                <Row>
                <div style={{width: '276px', }} className=" bg-light ">
                    <Sidebar listItems={[{title: 'Challenge one', path: '/challenges'}] as RouteConf[]} actualPath={this.props.location.pathname}/>
                </div>
                <Col md={8} className="px-3">
                    <Content className="py-5">
                        <h2>Challenge One</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                        <Container fluid>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={10} />
                            </Form.Group>
                        </Form>
                        <Button className="float-right" variant="primary" onClick={this._handleSubmit}><strong>POST</strong></Button>
                        </Container>
                    </Content>
                </Col>
                </Row>
            </Container>
        )
    }
}