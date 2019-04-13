import React, { Component, CSSProperties } from 'react';
import { Collapse, Row, Col, Container } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { EditUserProfile } from '../editUserProfile/editUserProfile';

interface UserDetails{
    email: string;
    f_name: string;
    id: number;
    l_name: string;
    password: string;
    profileImage: any | null;
    username: string;
}

interface Props{
    user:UserDetails;
}
interface State{
    isEditing: boolean;
}

export class UserProfile extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state = {
            isEditing: false
        }
    }
    private _renderImage(){
        const { profileImage } = this.props.user
        if(!!profileImage){
            return <Image src={profileImage.url} width={205} height={215} roundedCircle className="mb-3"/>
        }
        return <Image src="" width={205} height={215} roundedCircle className="mb-3"/>
        
    }
    private _renderEditUserProfile(){
        const detailCSS:CSSProperties = {
            color:"dimgray"
        }
        let { isEditing } = this.state;
        const { user } = this.props;
        if (isEditing){
            return <EditUserProfile user={user}/>
        } 
        return <div>
            <h5 className='pb-1 pl-4'>Username: <span style={detailCSS}>{user.username}</span></h5>
            <h5 className='pb-1 pl-4'>Email: <span style={detailCSS}>{user.email}</span></h5>
            <h5 className='pb-1 pl-4'>First Name: <span style={detailCSS}>{user.f_name}</span></h5>
            <h5 className='pb-1 pl-4'>Last Name: <span style={detailCSS}>{user.l_name}</span></h5>
            <Button className="float-right mx-3" onClick={() => this.setState({isEditing: !isEditing})}>Edit</Button>
        </div>
    }
    render(){
        return (
            <Container className='bg-white shadow-sm my-5 py-3' style={{borderBottom: "4px solid var(--primary)"}}>
                <h2 className='pb-2 pl-3'>User Profile</h2>
                <Row className='align-items-center'>
                    <Col>
                        {this._renderEditUserProfile()}
                    </Col>
                    <Col className='text-center border-left'>
                        {this._renderImage()}
                    </Col>
                </Row>
            </Container>
        )
    }

}