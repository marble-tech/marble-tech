import React from "react";
import * as H from 'history';
import Row from "react-bootstrap/Row";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Link, Redirect } from 'react-router-dom';
import { UserService } from "../../../services/UserService";
import { validateUser } from "../../../validation/userValidation";
interface SignupProps {
    history:any;
    // location: string;
}

interface SignupState {
    email:string;
    password:string;
    f_name:string;
    l_name:string;
    confirmPassword:string;
    err_form: string | null;
    isRegistered: boolean;
    validated:boolean
    err: {
        email:string | null;
        password:string | null;
        f_name:string | null;
        l_name:string | null;
        confirmPassword:string | null

    };
}
const userService = new UserService;
export class Signup extends React.Component<SignupProps,SignupState> {
    public constructor(props:SignupProps) {
        super(props);
       this.state ={
            email:"",
            password:"",
            f_name:"",
            l_name:"",
            confirmPassword:"",
            isRegistered:false,
            validated:false,
            err_form: null,
            err: {
                f_name: null,
                l_name: null,
                email: null,
                password: null,
                confirmPassword:null
            }
       }

    this._onChange = this._onChange.bind(this);
    this._userSignup = this._userSignup.bind(this);

    }
    private _onChange(e:any) {
        let data:any = this.state;
        data[e.target.id] = e.target.value;
        let state = this.validate(data)
        this.setState(state)
    }


    private validate(data:any){
        data.err_form=null;
        data.err={
            f_name: null,
            l_name: null,
            email: null,
            password: null,
            confirmPassword:null
        }
        let validated = validateUser(data)
        if (!!validated.error){
            
            let detail = validated.error.details[0]
            let { key }:any = detail.context;
            data.err[key] = detail.message;
            data.validated=false;
        }else{

            data.validated=true;
        }
        return data
    }
    private _renderFormError(){
        if(!!this.state.err_form ){
            return <div className="text-center" style={{
                width: "100%",
                marginTop: "0.25rem",
                fontSize: "80%",
                color: "#dc3545"}}>{this.state.err_form}</div>;
        } else {
            return <span></span>;
            
        }
    }
    private _userSignup(){
        userService.create({
            email: this.state.email,
            password: this.state.password,
            f_name: this.state.f_name,
            l_name: this.state.l_name
        }).then((res:any) => {
            this.setState({isRegistered:true});
        })
        .catch((err:any) => {
            this.setState({err_form:err.message})
        });
    }

    public render() {
        let {validated} = this.state
        if(this.state.isRegistered){
            return(<Row className="h-100 pr-4 align-items-center">
                <Col className="text-center">
                <h2>Thank you!!!</h2>
                <h5>Know you are all set! <Link to="/login">Login</Link> and start your first challenge now!</h5>
                
                </Col>
            </Row>)
        }
        return (
            <Row className="h-100 pr-4">
                <Col className="py-4"><h1>Sign Up</h1>
                <Form className="my-3" >
                    <Form.Group>
                    <Form.Control
                            type="text"
                            id="f_name"
                            placeholder="First Name" 
                            value={this.state.f_name}
                            onChange={this._onChange}
                            isInvalid={!!this.state.err.f_name}
                        />
                    <Form.Control.Feedback type="invalid">
                        {this.state.err.f_name}
                    </Form.Control.Feedback>
                    </Form.Group >
                    <Form.Group>
                        <Form.Control
                                type="text"
                                id="l_name"
                                placeholder="Last Name" 
                                value={this.state.l_name} 
                                onChange={this._onChange}
                                isInvalid={!!this.state.err.l_name}
                                />
                            <Form.Control.Feedback type="invalid">
                                {this.state.err.l_name}
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="email"
                            id="email"
                            placeholder="name@example.com" 
                            value={this.state.email} 
                            onChange={this._onChange}
                            isInvalid={!!this.state.err.email}
                        />
                    <Form.Control.Feedback type="invalid">
                        {this.state.err.email}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control 
                            type="PASSWORD" 
                            id="password"
                            placeholder="Password" 
                            value={this.state.password} 
                            onChange={this._onChange}
                            isInvalid={!!this.state.err.password}
                        />
                    <Form.Control.Feedback type="invalid">
                        {this.state.err.password}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group style={{height:"60px"}} className="mb-1">
                        <Form.Control 
                            type="PASSWORD" 
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            
                            onChange={this._onChange}
                            isInvalid={!!this.state.err.confirmPassword}
                        />
                    <Form.Control.Feedback type="invalid">
                        {this.state.err.confirmPassword}
                    </Form.Control.Feedback>
                    </Form.Group>
                    {this._renderFormError()}
                    <Button style={{width:'155px'}}
                        disabled={!validated}
                        type="button" 
                        onClick={this._userSignup}
                    >SIGN UP</Button>
                   
                    <h6 className="mt-5 text-center">Already has an account? <Link to="/login">Login</Link></h6>
    
                </Form>
                </Col>
            </Row>
        );
    }
}