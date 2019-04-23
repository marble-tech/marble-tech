import React, { Component } from 'react';
import { ChallengesItem } from './challengesItem';


interface Props{
    challengesUser:any[];
}
interface State{}
export class  ChallengesUser extends Component<Props, State>{
    constructor(props:Props){
        super(props);
    }
    private _renderChallengesItems(){
        const { challengesUser } = this.props
        return challengesUser.map(i => {
            return <ChallengesItem challenge={i} key={i.id}/>
        })
    }
    render(){
        return (
            <div>
                <h2 className='mb-3'>Challenges</h2>
                {this._renderChallengesItems()}
            </div>
        )
    }

}