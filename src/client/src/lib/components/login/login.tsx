import React from "react";
import Row from "react-bootstrap/Row";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';
import { validateLogin } from "../../../validation/userValidation";
import { AuthService } from "../../../services/AuthService";
import { Loading } from "../loading/loading";
interface LoginProps {
    history: any;
}

interface LoginState {
    email: string;
    password: string;
    error: string | null;
    touched: {
        email: boolean,
        password: boolean
      }
    isLoading: boolean;
}
const auth:AuthService = new AuthService;
export class Login extends React.Component<LoginProps,LoginState> {
    public constructor(props: LoginProps) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: null,
            touched: {
                email: false,
                password: false
              },
            isLoading: false
        };
        this._onChange = this._onChange.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
    }

    private _onChange(e:any) {
        this.setState({ ...this.state, [e.target.id]:e.target.value, error:null })
    }
    private _handleBlur(field:any){
        this.setState({
          touched: { ...this.state.touched, [field]: true }
        });
      }
    private _renderValidationErrors() {
        const validationResult = validateLogin({
            email: this.state.email,
            password: this.state.password
        });
        if (!!validationResult.error && (this.state.touched.email || this.state.touched.email)) {
            return <div className="text-center" style={{
                width: "100%",
                marginTop: "0.25rem",
                fontSize: "80%",
                color: "#dc3545"}}>
                    {validationResult.error.details.map((d:any, index:any) => <div key={index}>{d.message}
                </div>)}
            </div>;
        } else {
            return <div></div>;
        }
    }
    private _renderServerErrors() {
        if (!!this.state.error) {
            return <div className="text-center" style={{
                width: "100%",
                marginBottom: "0.25rem",
                fontSize: "80%",
                color: "#dc3545"}}>{this.state.error}</div>;
        } else {
            return <div></div>;
        }
    }
    private _handleSubmit(){
        this.setState({ isLoading: true });
        (async () => {
            await auth.login(this.state.email, this.state.password)
                .then((res:any) => {
                    this.setState({ error: null });
                    this.props.history.push("/dashboard");
                })
                .catch((err:any) => {
                    console.log(err)
                    this.setState({ error: err.message });
                })
            this.setState({ isLoading: false })
        })();
    }
    public render() {
        const { isLoading } = this.state;
        return (
            <Row className="align-items-center h-100 pr-4">
                <Col>
                    <h1>Sign in</h1>
                    <Form className="my-3">
                        <Form.Group>
                            <Form.Control
                                onBlur={()=>this._handleBlur('email')}
                                type="email"
                                id="email"
                                placeholder="name@example.com" 
                                value={this.state.email} 
                                onChange={this._onChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control 
                                onBlur={()=>this._handleBlur('email')}
                                type="PASSWORD" 
                                id="password"
                                value={this.state.password} 
                                onChange={this._onChange}
                            />
                        </Form.Group>
                        {this._renderServerErrors()}
                        {this._renderValidationErrors()}
                        <Button style={{width:'155px'}}
                            type="button" 
                            onClick={this._handleSubmit}
                        >LOGIN</Button>
                        <h6 className="mt-5 text-center">Don't have an account? <Link to="/register">Register here</Link></h6>

                    </Form>
                    {/* <Loading show={isLoading}/> */}
                </Col>
            </Row>
        );
    }
}