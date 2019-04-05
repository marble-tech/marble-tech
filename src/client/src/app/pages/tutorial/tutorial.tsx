import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Content } from "../../../lib/components";
import { postsRoutes } from "../../config/posts-routing";
import { Route, Link } from 'react-router-dom';
import { Sidebar } from '../../../lib/components/sidebar/sidebar';

interface TutorialProps {
    location: any
}

export class Tutorial extends React.Component<TutorialProps>{
    render() {
        return (
            <div className='container-raw'>
                <div className="row">
                    <div className="col-sm-12 col-md-12 offset-lg-1 col-lg-10 offset-xl-2 col-xl-8">
                    {
                        postsRoutes.map((item: any, key: any) => <Route exact path={item.path} render={() => <Content className="py-5">{item.post()}</Content>} key={key} />)
                    }    
                    </div>
                </div>
            </div>
        )
    }
}
