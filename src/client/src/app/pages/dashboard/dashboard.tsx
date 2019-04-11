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
        };
        
    }
    private _renderServerErrors() {
        if (!!this.state.error) {
            return <div className="text-center h5" style={{
                width: "100%",
                marginTop: "0.25rem",
                color: "#dc3545"}}><strong>Error: </strong>{this.state.error}</div>;
        } else {
            return <div></div>;
        }
    }
    private _renderUserProfile(){
        if(!!this.state.userDetails){
            return <UserProfile user={ this.state.userDetails }/>
        }
        return <div></div>
    }
    private _loadData(){
        this.setState({pageLoading: true});
        (async () => {
            await userService.get(this.state.userId)
                .then((res:any)=>{
                    console.log(res)
                    this.setState({userDetails:res})
                })

            this.setState({pageLoading: false})
        })();
    }
    componentDidMount() {
        this._loadData();
    }
    render(){
        return (
            <Container>
                <Row>
                <Col md={9}>
                    { this._renderUserProfile() }
                </Col>
                <Col md={3} >
                    <Ranking rankList={md.rank} />
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