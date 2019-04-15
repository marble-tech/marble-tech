import React, { Component } from 'react';
import { Collapse, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './challengesItem.css';

interface Challenge{
    title: string;
    id: number;
    description: string;
    level: string;
    status: 'passed' | 'attempted' | 'todo';
}
interface Props{
    challenge: Challenge;
}
interface State{
    open:boolean
}
export class ChallengesItem extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state = {
            open:false,
        }
    }
    private _renderTryItBtn(){
        
    }
    private _renderIcon(){
        const { status } = this.props.challenge;
        if(status === 'passed'){
            return  <i className="far fa-check-circle fa-2x" style={{color:'#00C851'}}></i>
        } else if (status === 'attempted'){
            return  <i className="far fa-pause-circle fa-2x" style={{color:'#fdd835'}}></i>
        } else if (status === 'todo'){
            return  <i className="far fa-times-circle fa-2x" style={{color:'#CC0000'}}></i>
        }
        return <div></div>  
        
    }
    render(){
        const { 
            title,
            id,
            description,
            level,
        } = this.props.challenge
        const { open } = this.state;
        return (
            <div className='bg-white shadow-sm mb-3'>
                <div className={'item nav-item' + (open ? ' active':'')}>
                <Row onClick={() => this.setState({ open: !open })}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    className="align-items-center py-3 no-gutters border-bottom"
                > 
                    <Col md={9}>
                        <h4 className="m-0 pl-5">
                            {title}
                            <small className="text-muted"> - {level}</small>
                        </h4></Col>
                    <Col md={3} className='text-center'>{this._renderIcon()}</Col>
                </Row>
                </div>
                <Row className='no-gutters'>
                    <Collapse in={this.state.open}>
                        <Col id="example-collapse-text" className="py-3 px-4 bg-gray">
                            <Row className="pb-3" ><Col>{description}</Col></Row>
                            <Link className='btn btn-primary float-right mr-4' to={'/challenges/'+id}>Try it!</Link>
                        </Col>
                    </Collapse>
                </Row>
                
            </div>
        )
    }

}