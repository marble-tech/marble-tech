import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { validateUser } from "../../../validation/userValidation";
import { UserService } from '../../../services/UserService';
import { Form } from 'react-bootstrap';
import { Loading } from '../loading/loading';

interface UserDetails{
    f_name: string;
    id: number;
    l_name: string;
    password: string;
    username: string;
    email: string;
}

interface Props{
    user: UserDetails;
    isEditing: () => void;
}
interface State{
    isLoading: boolean;
    email: string;
    username: string;
    f_name: string;
    l_name: string;
    password: string;
    confirmPassword: string;
    validated: boolean;
    err_form: string | null;
    err: {
        f_name: string | null,
        l_name: string | null,
        username: string | null,
        password: string | null,
        confirmPassword: string | null
    }

}
const userService = new UserService;
export class EditUserProfile extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        const { username,f_name, l_name, password, email } = props.user
        this.state = {
            isLoading: false,
            username: username,
            email: email,
            f_name: f_name,
            l_name: l_name,
            password: '',
            confirmPassword: '',
            validated: true,
            err_form: null,
            err: {
                f_name: null,
                l_name: null,
                username: null,
                password: null,
                confirmPassword:null
            }
        }

    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    }
    private validate(data:any){
        data.err_form=null;
        data.err={
            f_name: null,
            l_name: null,
            username: null,
            password: null,
            confirmPassword: null
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
    private _handleChange(e:any) {
        let data:any = this.state;
        data[e.target.id] = e.target.value;
        let state = this.validate(data)
        this.setState(state)
    }
    private _handleSubmit(){
        this.setState({ isLoading: true });
        const { user } = this.props;
        (async()=>{
            await userService.update(user.id,{
                password: this.state.password,
                f_name: this.state.f_name,
                l_name: this.state.l_name,
                username: this.state.username
            }).then((res:any) => {
                this.props.isEditing();
            })
            .catch((err:any) => {
                this.setState({err_form:err.message})
            });
            this.setState({ isLoading: false })
        })()
    }
    private _renderFormError(){
        if(!!this.state.err_form ){
            return <div className="text-center" style={{
                width: "100%",
                marginBottom: "0.25rem",
                fontSize: "80%",
                color: "#dc3545"}}>{this.state.err_form}</div>;
        } else {
            return <span></span>;
            
        }
    }
    render(){
        const { 
            username,
            f_name, 
            l_name, 
            password, 
            confirmPassword,
            validated,
            err
        } = this.state;
        return (
            <Row>
                <Col>
                <Form className="my-3" >
                    <Form.Group>
                        <Form.Control
                            type="text"
                            id="username"
                            placeholder="username" 
                            value={username} 
                            onChange={this._handleChange}
                            isInvalid={!!this.state.err.username}
                        />
                    <Form.Control.Feedback type="invalid">
                        {this.state.err.username}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                    <Form.Control
                            type="text"
                            id="f_name"
                            placeholder="First Name" 
                            value={f_name}
                            onChange={this._handleChange}
                            isInvalid={!!err.f_name}
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
                                value={l_name} 
                                onChange={this._handleChange}
                                isInvalid={!!err.l_name}
                                />
                            <Form.Control.Feedback type="invalid">
                                {err.l_name}
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control 
                            type="PASSWORD" 
                            id="password"
                            placeholder="Password" 
                            value={password} 
                            onChange={this._handleChange}
                            isInvalid={!!err.password}
                        />
                    <Form.Control.Feedback type="invalid">
                        {err.password}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group style={{height:"60px"}} className="mb-1">
                        <Form.Control 
                            type="PASSWORD" 
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword} 
                            onChange={this._handleChange}
                            isInvalid={!!err.confirmPassword}
                        />
                    <Form.Control.Feedback type="invalid">
                        {err.confirmPassword}
                    </Form.Control.Feedback>
                    </Form.Group>
                    {this._renderFormError()}
                    <Button style={{width:'155px'}}
                        disabled={!validated}
                        type="button" 
                        onClick={this._handleSubmit}
                    >Save</Button>
                </Form>

                <Loading show={this.state.isLoading}/>
                </Col>
            </Row>
        )
    }
}