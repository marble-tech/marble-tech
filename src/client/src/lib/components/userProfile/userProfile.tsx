import React, { Component, CSSProperties } from 'react';
import { Collapse, Row, Col, Container } from 'react-bootstrap';
import { Image } from 'react-bootstrap';

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
}
export class UserProfile extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state = {
        }
    }
    private _renderImage(){
        const { profileImage } = this.props.user
        if(!!profileImage){
            console.log("foto")
            return <Image src={profileImage.url} width={205} height={215} roundedCircle className="mb-3"/>
        }
        return <Image src="" width={205} height={215} roundedCircle className="mb-3"/>
        
    }
    render(){
        const detailCSS:CSSProperties = {
            color:"dimgray"
        }
        const {
            email,
            f_name,
            l_name,
            username,
        } = this.props.user
        return (
            <Container className='bg-white shadow-sm my-5 py-3' style={{borderBottom: "4px solid var(--primary)"}}>
                <h2 className='pb-2 pl-3'>User Profile</h2>
                <Row className='align-items-center'>
                    
                    <Col>
                        <h5 className='pb-1 pl-4'>Username: <span style={detailCSS}>{username}</span></h5>
                        <h5 className='pb-1 pl-4'>Email: <span style={detailCSS}>{email}</span></h5>
                        <h5 className='pb-1 pl-4'>First Name: <span style={detailCSS}>{f_name}</span></h5>
                        <h5 className='pb-1 pl-4'>Last Name: <span style={detailCSS}>{l_name}</span></h5>
                        <h5 className='pb-1 pl-4'>Email: <span style={detailCSS}>{email}</span></h5>
                        {/* profileImage, */}
                    </Col>
                    <Col className='text-center border-left'>
                        {this._renderImage()}
                    </Col>
                </Row>
            </Container>
        )
    }

}