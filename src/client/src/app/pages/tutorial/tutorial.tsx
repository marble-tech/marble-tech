import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Content } from "../../../lib/components";
import { postsRoutes } from "../../config/posts-routing";
import { Route, Link } from 'react-router-dom';
import { Sidebar } from '../../../lib/components/sidebar/sidebar';

interface TutorialProps{
    location: any
}

export class Tutorial extends React.Component<TutorialProps>{
    render(){
        return (
            <Container fluid>
                <Row>
                <div style={{width: '276px', minHeight: '100vh'}} className=" bg-light ">
                    <Sidebar listItems={postsRoutes} actualPath={this.props.location.pathname}/>
                </div>
                

                <Col md={8} className="px-3">
                    {
                        postsRoutes.map((item:any, key:any) => <Route exact path={item.path}  render={()=><Content className="py-5">{item.post()}</Content>} key={key} />)
                    }
                </Col>
                </Row>
                
                
                
            </Container>
        )
    }
}
