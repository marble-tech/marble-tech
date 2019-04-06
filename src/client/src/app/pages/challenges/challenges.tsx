import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
import { Content } from "../../../lib/components";
import { postsRoutes } from "../../config/posts-routing";
import { Route, Link } from 'react-router-dom';
import { Sidebar } from '../../../lib/components/sidebar/sidebar';
import Button from 'react-bootstrap/Button';
import {ChallengeService} from "../../../services/ChallengeService"

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
    // challengeID: number | null;
    title: string|null;
    description: string|null;
    sampleAnswer: string;

}
const challService:ChallengeService = new ChallengeService;
export class Challenges extends React.Component<ChallengesProps,ChallengesState>{
    public constructor(props: ChallengesProps) {
        super(props);
        this.state = {
            challengeAns:"",
            error:null,
            title: null,
            description: null,
            sampleAnswer: "",
            challengesList: null,
        };
        this._onChange = this._onChange.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
    }

    private _onChange(e:any) {
        console.log(this.state.challengeAns)
        this.setState({ ...this.state, [e.target.id]:e.target.value })
    }
    private _renderServerErrors() {
        if (!!this.state.error) {
            return <div className="text-center" style={{
                width: "100%",
                marginTop: "0.25rem",
                fontSize: "80%",
                color: "#dc3545"}}>{this.state.error}</div>;
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
    private _handleSubmit(){
        let t = `app.get(\"/\", (req, res) => {
            res.send(\"This is the home page\!\");
        });`;
        (async()=>{
            
            const rest = await challService.test(this.props.match.params.id, this.state.challengeAns)
                .then((res:any) => {
                    this.setState({ error: null });
                    console.log(res)
                    // this.props.history.push("/challenges");
                })
                .catch((err:any) => {
                    console.log(err)
                    this.setState({ error: err.message });
            })
        })();
    }
    public componentDidMount() {
        (async () => {
            await challService.get(this.props.match.params.id)
                .then((res:any)=> {
                    let {title, description, sampleAnswer} = res;
                    this.setState({title, description, sampleAnswer})
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
                    console.log(list)
                    this.setState({challengesList: list})
                })
                .catch((e:any)=>{
                    console.log(e)
                });
        })();
    }
    render(){
        let {title, description, challengesList} = this.state;
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
                            <h2>{title}</h2>
                            <p className="lead">{description}</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                            <Form>
                                <Form.Group controlId="challengeAns">
                                <Form.Label>Example textarea</Form.Label>
                                <Form.Control as="textarea" rows={10} onChange={this._onChange} />
                                </Form.Group>
                            </Form>
                            <Button className="float-right" variant="primary" onClick={this._handleSubmit}><strong>POST</strong></Button>
                            {this._renderServerErrors()}
                        </Content>
                    </Col>
                    </Row>
                </Container>
            )

        }
        
    }
}