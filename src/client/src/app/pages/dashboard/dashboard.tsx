import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { Content } from "../../../lib/components";
import { Sidebar } from '../../../lib/components/sidebar/sidebar';
import Button from 'react-bootstrap/Button';
import { FeedbackModal } from '../../../lib/components/feedbackModal/feedbackModal';
import { Loading } from '../../../lib/components/loading/loading';

interface DashboardProps{
    location?: any;
    history?:any;
    match?:any;
}
interface DashboardState{
    error: string | null;
    pageLoading: boolean;
}

export class Dashboard extends Component<DashboardProps,DashboardState>{
    public constructor(props: DashboardProps) {
        super(props);
        this.state = {
            error:null,
            pageLoading:false,
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
    private _loadData(){
        this.setState({pageLoading: true});
        (async () => {
            // call data fetch

            this.setState({pageLoading: false})
        })();
    }
    componentDidUpdate(nextProps:any, prevState:any) {
        if(this.props.match.params.id!==nextProps.match.params.id){
            // clear previews state 
            this._loadData();
        }
    }
    render(){
        return (
            <Container fluid>
                
                <Loading show={this.state.pageLoading}/>
            </Container>
        )
    }
}