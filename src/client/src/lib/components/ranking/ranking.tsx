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
        const noPic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3CAMAAAAO5y+4AAAAMFBMVEXk5ueutLfp6+yrsbTa3d6xt7rW2du3vL/g4uPIzM6/xMaorrLM0NK7wMPCx8nT1tiM4Z/vAAACkUlEQVRoge2Z0XqkIAxGhYCiiL7/2y7a7XzTqULi/HHbbzk37d2ZQICYdF2j0Wg0Go1Go/H/YO3fv/dq3TylIZOWNdzltP3iI5kPiGiY74ja9kM0XyFatM02fLPu5jiqiu1KB9bd7BX32S5n2s3cq4WcClpF8VTUZvGqoh0r2oxT0J6m1BMerw11a17pCb3FtpxTDzF6pXuWNq80NmA78LTonOaGCw7Y1o7uU8A90NuxtdiU5pzdhxjoLb0Hr0TcUbJ8a453xnmP3vpT7wTzOsEyGzPANph/endg3lnkxSW0zBtR2l/iJZhXcl0h91d2joAvkuTeMAnmld1XI0qbiyuJF/gASxIad4xyESvw4q5nQVkHfQY70UIjtV3nueEu0ALasgNGf37zAiZ4v4H39uM/CFmlO/yzbKN+lmjW6DRUv4BpUbBmXEWLK2BfCL7UR1KKdmc4Fevs7Sd2pEMzeafbobQhfTeTwb3152Y3xWczRXNLI3jrta+Lj5GIYozDqLzCr+7g+t49+v23KLuwSTOudyHou7PA9fM07G8TbWz/eJ/G1QUte3bOyZvDc5R/gR/GXqP1vU7++Og+yX2asWo3GV69QZRwdd3sRd8LZgQEbbuTm7EY9BTeTLJcz0mtO/Ets12Z23oU9OUKz1bmJzXxxSfqnWA/Q77iZYxPquIkz+y31vgh9sLCtlhJiRAN0XBa0fSONStSEHM/Opli5h7b82L1opinlTT1ebA6aU7UJGPBujPh1k1cvz8A19QBqepV0ZpYaeIpJNUHwz/Y3Y3KNEvWWZdQHhvy+4FiSikNvZi/UhxIywYJMm9hodWyeaPQUhO0ey94CxuMfQBfOD9JQdNbmjtYTc61jUaj8YP5A0gxGpGxLuaTAAAAAElFTkSuQmCC" 
        const { rankList } = this.props
        return rankList.sort((a: any,b: any) => b.challenges - a.challenges)
            .map((i, k)=> {
            
                return (
                    <div key={k} className={'shadow-sm px-3 py-2 mb-2 rounded' + (i.authUser ? ' bg-primary text-white' : 'bg-white')}>
                        <Row className='align-items-center'>
                            <Col sm={1}>{(k+1)+'.'}</Col>
                            <Col sm={3} className='text-center'><Image src={i.pic?i.pic :noPic } className='shadow-sm' width={30} height={30} roundedCircle/></Col>
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