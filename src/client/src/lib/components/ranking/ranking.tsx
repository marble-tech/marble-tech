import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Image } from 'react-bootstrap';

interface RankItem{
    id: number;
    username: string;
    challenges: number;
    pic: string; // encode base64
    authUser: boolean
}

interface Props{
    rankList:RankItem[];
}

interface State {}

export class Ranking extends Component<Props, State>{
    constructor(props:Props){
        super(props)
    }
    private _renderRankList(){
        const { rankList } = this.props
        return rankList.sort((a: any,b: any) => b.challenges - a.challenges)
            .map((i, k)=> {
            
                return (
                    <div key={k} className={'shadow-sm px-3 py-2 mb-2 rounded' + (i.authUser ? ' bg-primary text-white' : 'bg-white')}>
                        <Row className='align-items-center'>
                            <Col sm={1}>{(k+1)+'.'}</Col>
                            <Col sm={3} className='text-center'><Image src={i.pic} className='shadow-sm' width={30} height={30} roundedCircle/></Col>
                            <Col sm={5}>{i.username}</Col>
                            <Col sm={2} className='text-center'>{i.challenges}</Col>
                        </Row>
                    </div>
                )
            })
    }
    render(){
        return (
            <div className='py-4'>
                <h5 className='px-2'>Challenges completed Rank</h5>
                {this._renderRankList()}
            </div>
        )
    }
}