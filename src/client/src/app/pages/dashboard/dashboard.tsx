import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Loading } from '../../../lib/components/loading/loading';
import * as md from './mockData';
import { Ranking } from '../../../lib/components/ranking/ranking';
import { ChallengesUser } from '../../../lib/components/challengesUser/challengesUser';
import { UserService } from '../../../services/UserService';
import { UserProfile } from '../../../lib/components/userProfile/userProfile';
import { withRouter } from 'react-router';

interface DashboardProps{
    location?: any;
    history?:any;
    match?:any;
}
interface DashboardState{
    error: string | null;
    pageLoading: boolean;
    userId: number;
    userDetails: any | null;
    rank: any[];
}

const userService:UserService = new UserService;
export class Dashboard extends Component<DashboardProps,DashboardState>{
    public constructor(props: DashboardProps) {
        super(props);
        this.state = {
            error:null,
            pageLoading:false,
            userId: 1,
            userDetails: null,
            rank : [],
        };
        
    }
    private _renderUserProfile(){
        if(!!this.state.userDetails){
        return <UserProfile user={ this.state.userDetails } {...this.props}/>
        }
        return <div></div>
    }
    private _loadData(){
        this.setState({pageLoading: true});
        (async () => {
            await userService.get(this.state.userId)
                .then((res:any)=>{
                    this.setState({userDetails:res})
                })
            await userService.getRank()
                .then((res:any)=>{
                    this.setState({rank:res})
                })
            this.setState({pageLoading: false})
        })();
    }
    componentDidMount() {
        this._loadData();
    }
    render(){
        const { rank } = this.state;
        return (
            <Container>
                <Row>
                <Col md={9}>
                    { this._renderUserProfile() }
                </Col>
                <Col md={3} >
                    <Ranking rankList={rank} />
                </Col>
                </Row>
                <Row>
                    <Col>
                        <ChallengesUser challengesUser={md.challenges}/>
                    </Col>
                </Row>

                
                <Loading show={this.state.pageLoading}/>
            </Container>
        )
    }
}