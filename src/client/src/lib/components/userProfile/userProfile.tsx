import React, { Component, CSSProperties } from 'react';
import { Collapse, Row, Col, Container, Modal } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { EditUserProfile } from '../editUserProfile/editUserProfile';
import { UserService } from '../../../services/UserService';
import { Loading } from '../loading/loading';

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
    history?:any;
    onUpdate: () => void;
}
interface State{
    isEditing: boolean;
    isUploadingPic: boolean;
    upProfileImage: File | null;
    isLoading: boolean;
    errUploadImage: string | null;
}
const userService = new UserService;
export class UserProfile extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state = {
            isEditing: false,
            isUploadingPic: false,
            upProfileImage: null,
            isLoading: false,
            errUploadImage: null,
        }
    }
    private _renderImage(){
        const { profileImage } = this.props.user
        if(!!profileImage){
            return <Image src={profileImage.url} width={205} height={215} roundedCircle className="mb-3"/>
        }
        return <Image src="" width={205} height={215} roundedCircle className="mb-3"/>
        
    }
    private _handleChange(e:any) {
        let state:any = this.state;
        state[e.target.id] = e.target.files[0];
        this.setState(state)
    }
    private _handleEditingState(){
        let { isEditing } = this.state;
        this.setState({isEditing: !isEditing})
        if(isEditing ){ this.props.onUpdate() }
    }
    private _handleShowUpdatePic() {
        this.setState({ isUploadingPic: true });
    }
    private _handleCloseUpdatePic() {
        this.setState({ isUploadingPic: false });
    }
    private _renderUploadImageError(){
        if(!!this.state.errUploadImage ){
            return <div className="text-center" style={{
                width: "100%",
                marginBottom: "0.25rem",
                fontSize: "80%",
                color: "#dc3545"}}>{this.state.errUploadImage}</div>;
        } else {
            return <span></span>;
            
        }
    }
    private _handleSubmit(){
        this.setState({ isLoading: true });
        const { upProfileImage } = this.state;
        const { user } = this.props;
        console.log(upProfileImage)
        if(upProfileImage){
            (async()=>{
                await userService.uploadImage(user.id, upProfileImage)
                    .then((res:any) => {
                        // should update image
                    })
                    .catch((err:any) => {
                        this.setState({errUploadImage: err.message})
                    });
                    
                    this.setState({ isLoading: false, isUploadingPic: false })
            })()
            this.props.onUpdate();
        }
    }
    private _renderPicUpload(){
        return (
          <Modal show={this.state.isUploadingPic} onHide={this._handleCloseUpdatePic.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>
            <div className="form-group">
                <label>Upload profile image</label>
                <input type="file" className="form-control-file" id="upProfileImage" onChange={this._handleChange.bind(this)}></input>
            </div>
            </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this._handleCloseUpdatePic.bind(this)}>
                Close
              </Button>
              <Button variant="primary" onClick={this._handleSubmit.bind(this)}>
                Save Changes
              </Button> 
            </Modal.Footer>
          </Modal>
        )
    }

    private _renderEditUserProfile(){
        const detailCSS:CSSProperties = {
            color:"dimgray"
        }
        const { isEditing } = this.state;
        const { user } = this.props;
        if (isEditing){
            return <EditUserProfile user={user} isEditing={this._handleEditingState.bind(this)}/>
        } 
        return <div>
            <h5 className='pb-1 pl-4'>Username: <span style={detailCSS}>{user.username}</span></h5>
            <h5 className='pb-1 pl-4'>Email: <span style={detailCSS}>{user.email}</span></h5>
            <h5 className='pb-1 pl-4'>First Name: <span style={detailCSS}>{user.f_name}</span></h5>
            <h5 className='pb-1 pl-4'>Last Name: <span style={detailCSS}>{user.l_name}</span></h5>
            <Button className="float-right mx-3" onClick={this._handleEditingState.bind(this)}>Edit</Button>
        </div>
    }
    // componentDidUpdate(nextProps:any, prevState:any) {
    //     if((prevState.isLogged!==authGuard.loggedIn()) && (authGuard.loggedIn()==true)){
    //         console.log("foi")
    //     }
    // }
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
                        <Button 
                            variant="primary" 
                            className="btn-lg rounded-circle position-absolute"
                            style={{transform: "translate(-100%, 350%)"}}
                            onClick={this._handleShowUpdatePic.bind(this)}
                        ><i className="fas fa-camera"></i></Button>
                        {this._renderUploadImageError()}
                        {this._renderPicUpload()}
                        <Loading show={this.state.isLoading}/>
                    </Col>
                </Row>
            </Container>
        )
    }

}