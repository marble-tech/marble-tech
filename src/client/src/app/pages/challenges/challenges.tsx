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
import { Loading } from '../../../lib/components/loading/loading';
import { CodeBlock } from '../../../lib/components/codeBlock/codeBlock';

interface challengesRoute {
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
    description: string;
    sampleAnswer: string;
    fbModalShow:boolean;
    challengeId: number | null;
    feedback: {
            failures:number,
            results:any[]
        } | null;
    pageLoading:boolean;
    reload:boolean;
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
            description: "",
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
            pageLoading: true,
            challengeId: null,
            reload:false
        };
        this._onChange = this._onChange.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
    }

    private _onChange(e:any) {
        this.setState({ ...this.state, [e.target.id]:e.target.value, error:null })
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
    private _renderChallengeDescription() {
        const { description } = this.state;
        if (!!description) {
            let data = description.split('<CodeBlock>')
            return  data.map((item, index) =>{
                if (index%2==1){
                    return <CodeBlock key={index}>{item}</CodeBlock>
                }
                return <div key={index} dangerouslySetInnerHTML={{__html:item}}></div>
            })
            
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
        this.setState({pageLoading: true});
        (async()=>{
            const rest = await challService.test(this.props.match.params.id, this.state.challengeAns)
                .then((res:any) => {
                    this.setState({
                        feedback: res, 
                        fbModalShow: true, 
                        error: null
                    });
                })
                .catch((err:any) => {
                    let errSubStr = (err.message[0] as string).split(":");
                    let errMsg = errSubStr[errSubStr.length-1];
                    this.setState({ error: errMsg});
            })
            this.setState({pageLoading: false});
        })();
    }
    private _loadChallengeData(){
        this.setState({pageLoading: true});
        (async () => {
            await challService.get(this.props.match.params.id)
                .then((res:any)=> {
                    let {title, description, sampleAnswer, level, id } = res;
                    this.setState({title, description, sampleAnswer, level, challengeId: id  })
                })
                .catch((e:any)=>{
                    console.log(e)
                });
            await challService.getAll()
                .then((res:any)=> {
                    let list = res.sort((a: any,b: any) => a.id - b.id)
                        .map((item:any)=>{
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
            this.setState({pageLoading: false})
        })();
    }
    componentDidUpdate(nextProps:any, prevState:any) {
        if(this.props.match.params.id!==nextProps.match.params.id){
            this._loadChallengeData();
        }
    }
    public componentDidMount() {
        this._loadChallengeData();
    }
    render(){
        let { title, description, challengesList, level } = this.state;
        return (
            <Container fluid>
                <Row>
                <div style={{ width: '276px' }} className=" bg-light ">
                    {this._renderSidebar()}
                </div>
                <Col md={8} className="px-3">
                    <Content className="py-5">
                        <h2>
                            {title}
                            <small className="text-muted"> - {level} level</small>
                        </h2>
                        <Row><Col>{this._renderChallengeDescription()}</Col></Row>
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
                <Loading show={this.state.pageLoading}/>
            </Container>
        )
    }
}