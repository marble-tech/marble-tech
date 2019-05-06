import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { Content } from "../../../lib/components";
import { Sidebar } from '../../../lib/components/sidebar/sidebar';
import {ChallengeService} from "../../../services/ChallengeService"
import { FeedbackModal } from '../../../lib/components/feedbackModal/feedbackModal';
import { Loading } from '../../../lib/components/loading/loading';
import { CodeBlock } from '../../../lib/components/codeBlock/codeBlock';
import { CompilerError } from '../../../lib/components/compilerError/compilerError';
import MonacoEditor from 'react-monaco-editor';

interface challengesRoute {
    title: string;
    path: string;  
    id: number;  
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
    content: string;
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
            challengeAns:"// Start coding here...",
            error: null,
            title: null,
            level: null,
            description: "",
            content: "",
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

    private _onChange(newValue:any ,e:any) {
        this.setState({challengeAns:newValue, error:null })
    }
    private _renderServerErrors() {
        if (this.state.error) {
            return <CompilerError error={this.state.error}></CompilerError>;
        } else {
            return <div></div>;
        }
    }
    private _renderChallengeDescription() {
        const { content } = this.state;
        if (!!content) {
            let data = content.split('<CodeBlock>')
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
    editorDidMount(editor:any, monaco: any) {
        console.log('editorDidMount', editor);
        editor.focus();
    }
    private _renderChallenge(){
        const options = {
            selectOnLineNumbers: true,
            minimap: {enabled: false}
          };
        let { title, level, challengeAns } = this.state;
        if (title){
            return <Content className="pt-5">
                        <h2>
                            {title}
                            <small className="text-muted"> - {level} level</small>
                        </h2>
                        <Row><Col>{this._renderChallengeDescription()}</Col></Row>
                        <Form>
                            <Form.Group controlId="challengeAns">
                                <Form.Label>Let's code:</Form.Label>
                                    {/* <Editor 
                                        onChange={this._onChange}
                                        value={challengeAns}
                                    /> */}
                                    <div className="rounded-lg py-3 px-4 mb-4" style={{backgroundColor:"#1e1e1e"}}>
                                        <MonacoEditor
                                        width="100%"
                                        height="300"
                                        language="typescript"
                                        theme="vs-dark"
                                        value={challengeAns}
                                        options={options}
                                        onChange={this._onChange}
                                        editorDidMount={this.editorDidMount}
                                    />
                                    </div>

                                {/* <Form.Control 
                                    as="textarea" 
                                    onKeyDown={(e:any)=>e.keyCode==9?e.preventDefault():""}
                                    rows={10} 
                                    onChange={this._onChange} 
                                    value={challengeAns} 
                                /> */}
                            </Form.Group>
                        </Form>
                        <a className="btn btn-primary text-white float-right" onClick={this._handleSubmit}><strong>POST</strong></a>
                </Content>

        }else{
            <div></div>
        }
        
    }
    private _renderSidebar() {
        const {challengesList} = this.state
        if (!!challengesList) {
            return (
                <Sidebar listItems={challengesList} withID actualPath={this.props.location.pathname}/>
            )
        } else {
            return <div></div>;
        }
    }
    private _renderFBModal() {
        const {match, location, history} = this.props
        let nextChallenge      
         
        let modalCloseOnSuccess = () => {
            this.setState({fbModalShow:false, challengeAns:""})
            if(this.state.challengesList){
                nextChallenge = this.state.challengesList.filter(element => element.id == (+match.params.id + 1))
                if(nextChallenge[0]){
                    this.props.history.push(nextChallenge[0].path)
                }else{
                    this.props.history.push("/dashboard")
                }
            }
            
        };
        let modalCloseOnFailure = () => {
            this.setState({fbModalShow:false})
        };
        const {feedback, fbModalShow, } = this.state
        if (feedback) {
            return (
                <FeedbackModal show={fbModalShow} feedback={feedback} onHide={feedback.failures>0?modalCloseOnFailure:modalCloseOnSuccess}/>
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
                    let {title, description, content, sampleAnswer, level, id, startingCode } = res;
                    this.setState({title, description, content, sampleAnswer, level, challengeId: id})
                })
                .catch((e:any)=>{
                    console.log(e)
                });
            await challService.getAll()
                .then((res:any)=> {
                    let list = res.sort((a: any,b: any) => a.id - b.id)
                        .map((item:any)=>{
                            return {
                                id: item.id,
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
            // clear previews state 
            this.setState({content: "", challengeAns:"// Start coding in here...", error:null})
            console.log(this.state.challengeAns)
            this._loadChallengeData();
        }
    }
    public componentDidMount() {
        this._loadChallengeData();
    }
    render(){
        
        return (
            <Container fluid>
                <Row className="pb-3">
                <div style={{ width: '276px' }} className=" bg-light ">
                    {this._renderSidebar()}
                </div>
                <Col md={8} className="px-3">
                    {this._renderChallenge()} 
                </Col>
                </Row>
                {this._renderServerErrors()}
                {this._renderFBModal()}
                <Loading show={this.state.pageLoading}/>
            </Container>
        )
    }
}