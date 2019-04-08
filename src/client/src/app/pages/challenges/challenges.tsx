import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { Content } from "../../../lib/components";
import { Sidebar } from '../../../lib/components/sidebar/sidebar';
import Button from 'react-bootstrap/Button';
import {ChallengeService} from "../../../services/ChallengeService"
import { FeedbackModal } from '../../../lib/components/feedbackModal/feedbackModal';

interface challengesRoute {
    title: string;
    path: string;    
}

interface challengesE {
    title: string;
    path: string;    
}

interface ChallengesProps{
    location?: any;
    history?:any;
    match?:any;
}
interface ChallengesState{
    challengesList: challengesRoute[] | null;
    location?: any
    challengeAns:string;
    error:string|null;
    title: string|null;
    level: string|null;
    description: string|null;
    sampleAnswer: string;
    fbModalShow:boolean
    feedback: {
            failures:number,
            results:any[]
        } | null

}
const challService:ChallengeService = new ChallengeService;
export class Challenges extends React.Component<ChallengesProps,ChallengesState>{
    public constructor(props: ChallengesProps) {
        super(props);
        this.state = {
            challengeAns:"",
            error: null,
            title: null,
            level: null,
            description: null,
            sampleAnswer: "",
            challengesList: null,
            fbModalShow: false,
            feedback: {
                failures: 1,
                results: [
                    {title: "some text", state: "passed"},
                    {title: "some text", state: "failed"}
                ]
            },
        };
        this._onChange = this._onChange.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
    }

    private _onChange(e:any) {
        this.setState({ ...this.state, [e.target.id]:e.target.value, error:null })
    }
    private _renderServerErrors() {
        if (!!this.state.error) {
            return <div className="text-center h4" style={{
                width: "100%",
                marginTop: "0.25rem",
                color: "#dc3545"}}><strong>Error: </strong>{this.state.error}</div>;
        } else {
            return <div></div>;
        }
    }
    private _renderSidebar() {
        const {challengesList} = this.state
        if (!!challengesList) {
            return (
                <Sidebar listItems={challengesList} actualPath={this.props.location.pathname}/>
            )
        } else {
            return <div></div>;
        }
    }
    private _renderFBModal() {
        let modalClose = () => this.setState({fbModalShow:false})
        const {feedback, fbModalShow, } = this.state
        if (!!feedback) {
            return (
                <FeedbackModal show={fbModalShow} feedback={feedback} onHide={modalClose}/>
            )
        } else {
            return <div></div>;
        }
    }
    private _handleSubmit(){
        (async()=>{
            const rest = await challService.test(this.props.match.params.id, this.state.challengeAns)
                .then((res:any) => {
                    this.setState({ error: null });
                    this.setState({feedback: res, fbModalShow:true});
                })
                .catch((err:any) => {
                    let errSubStr = (err.message[0] as string).split(":");
                    let errMsg = errSubStr[errSubStr.length-1];
                    this.setState({ error: errMsg});
            })
        })();
    }
    public componentDidMount() {
        (async () => {
            await challService.get(this.props.match.params.id)
                .then((res:any)=> {
                    let {title, description, sampleAnswer, level } = res;
                    this.setState({title, description, sampleAnswer, level })
                })
                .catch((e:any)=>{
                    console.log(e)
                });
            await challService.getAll()
                .then((res:any)=> {
                    let list = res.map((item:any, index:number)=>{
                        return {
                            title: item.title,
                            path: `/challenges/${item.id}`
                        }
                    })
                    this.setState({challengesList: list})
                })
                .catch((e:any)=>{
                    console.log(e)
                });
        })();
    }
    render(){
        let {title, description, challengesList, level} = this.state;
        
        if(!title || !challengesList){
            return (
                <div>loading...</div>
            )
        }else{
            return (
                <Container fluid>
                    <Row>
                    <div style={{width: '276px', }} className=" bg-light ">
                        {this._renderSidebar()}
                    </div>
                    <Col md={8} className="px-3">
                        <Content className="py-5">
                            <h2>
                                {title}
                                <small className="text-muted"> - {level} level</small>
                            </h2>
                            <p>{description}</p>
                            <Form>
                                <Form.Group controlId="challengeAns">
                                <Form.Label>Let's code:</Form.Label>
                                <Form.Control as="textarea" rows={10} onChange={this._onChange} />
                                </Form.Group>
                            </Form>
                            <Button className="float-right" variant="primary" onClick={this._handleSubmit}><strong>POST</strong></Button>
                            {/* <Button className="float-right" variant="primary" onClick={()=>this.setState({fbModalShow:true})}><strong>POST</strong></Button> */}
                            {this._renderServerErrors()}
                            {this._renderFBModal()}
                        </Content>
                    </Col>
                    </Row>
                </Container>
            )

        }

    }
}