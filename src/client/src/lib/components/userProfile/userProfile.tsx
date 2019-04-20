import React, { Component, CSSProperties } from 'react';
import { Collapse, Row, Col, Container, Modal } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { EditUserProfile } from '../editUserProfile/editUserProfile';
import { UserService } from '../../../services/UserService';
import { Loading } from '../loading/loading';
import { setAuthToken } from '../withAuth/withAuth';
import { getToken } from '../../../helpers/authGuard';

interface UserDetails {
    email: string;
    f_name: string;
    id: number;
    l_name: string;
    password: string;
    profileImage: any | null;
    username: string;
}

interface Props {
    user: UserDetails;
    history?: any;
    onUpdate: () => void;
}
interface State {
    isEditing: boolean;
    isUploadingPic: boolean;
    upProfileImage: File | null;
    isLoading: boolean;
    errUploadImage: string | null;
}
const userService = new UserService;

export class UserProfile extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            isEditing: false,
            isUploadingPic: false,
            upProfileImage: null,
            isLoading: false,
            errUploadImage: null,
        }
    }
    private _renderImage() {
        const { profileImage } = this.props.user
        if (!!profileImage) {
            return <Image src={profileImage.url} width={205} height={215} roundedCircle className="mb-3" />
        }
        return <Image width={205} height={215} roundedCircle className="mb-3" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3CAMAAAAO5y+4AAAAMFBMVEXk5ueutLfp6+yrsbTa3d6xt7rW2du3vL/g4uPIzM6/xMaorrLM0NK7wMPCx8nT1tiM4Z/vAAACkUlEQVRoge2Z0XqkIAxGhYCiiL7/2y7a7XzTqULi/HHbbzk37d2ZQICYdF2j0Wg0Go1Go/H/YO3fv/dq3TylIZOWNdzltP3iI5kPiGiY74ja9kM0XyFatM02fLPu5jiqiu1KB9bd7BX32S5n2s3cq4WcClpF8VTUZvGqoh0r2oxT0J6m1BMerw11a17pCb3FtpxTDzF6pXuWNq80NmA78LTonOaGCw7Y1o7uU8A90NuxtdiU5pzdhxjoLb0Hr0TcUbJ8a453xnmP3vpT7wTzOsEyGzPANph/endg3lnkxSW0zBtR2l/iJZhXcl0h91d2joAvkuTeMAnmld1XI0qbiyuJF/gASxIad4xyESvw4q5nQVkHfQY70UIjtV3nueEu0ALasgNGf37zAiZ4v4H39uM/CFmlO/yzbKN+lmjW6DRUv4BpUbBmXEWLK2BfCL7UR1KKdmc4Fevs7Sd2pEMzeafbobQhfTeTwb3152Y3xWczRXNLI3jrta+Lj5GIYozDqLzCr+7g+t49+v23KLuwSTOudyHou7PA9fM07G8TbWz/eJ/G1QUte3bOyZvDc5R/gR/GXqP1vU7++Og+yX2asWo3GV69QZRwdd3sRd8LZgQEbbuTm7EY9BTeTLJcz0mtO/Ets12Z23oU9OUKz1bmJzXxxSfqnWA/Q77iZYxPquIkz+y31vgh9sLCtlhJiRAN0XBa0fSONStSEHM/Opli5h7b82L1opinlTT1ebA6aU7UJGPBujPh1k1cvz8A19QBqepV0ZpYaeIpJNUHwz/Y3Y3KNEvWWZdQHhvy+4FiSikNvZi/UhxIywYJMm9hodWyeaPQUhO0ey94CxuMfQBfOD9JQdNbmjtYTc61jUaj8YP5A0gxGpGxLuaTAAAAAElFTkSuQmCC" />

    }
    private _handleChange(e: any) {
        let state: any = this.state;
        state[e.target.id] = e.target.files[0];
    }
    private _handleEditingState() {
        let { isEditing } = this.state;
        this.setState({ isEditing: !isEditing })
        if (isEditing) {
            this.props.onUpdate();
            (async () => {
                setAuthToken(getToken());
            })();
        }
    }
    private _handleShowUpdatePic() {
        this.setState({ isUploadingPic: true });
    }
    private _handleCloseUpdatePic() {
        this.setState({ isUploadingPic: false });
    }
    private _renderUploadImageError() {
        if (!!this.state.errUploadImage) {
            return <div className="text-center" style={{
                width: "100%",
                marginBottom: "0.25rem",
                fontSize: "80%",
                color: "#dc3545"
            }}>{this.state.errUploadImage}</div>;
        } else {
            return <span></span>;

        }
    }
    private _handleSubmit() {
        this.setState({ isLoading: true });
        const { upProfileImage } = this.state;
        const { user } = this.props;
        console.log(upProfileImage)
        if (upProfileImage) {
            (async () => {
                await userService.uploadImage(user.id, upProfileImage)
                    .catch((err: any) => {
                        this.setState({ errUploadImage: err.message })
                    });

                this.setState({ isLoading: false, isUploadingPic: false })
                await this.props.onUpdate();
                //window.location.reload();
                (async () => {
                    setAuthToken(getToken());
                })();

            })()

        }
    }
    private _renderPicUpload() {
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

    private _renderEditUserProfile() {
        const detailCSS: CSSProperties = {
            color: "dimgray"
        }
        const { isEditing } = this.state;
        const { user } = this.props;
        if (isEditing) {
            return <EditUserProfile user={user} isEditing={this._handleEditingState.bind(this)} />
        }
        return <div>
            <h5 className='pb-1 pl-4'>First Name: <span style={detailCSS}>{user.f_name}</span></h5>
            <h5 className='pb-1 pl-4'>Last Name: <span style={detailCSS}>{user.l_name}</span></h5>
            <h5 className='pb-1 pl-4'>Username: <span style={detailCSS}>{user.username}</span></h5>
            <h5 className='pb-1 pl-4'>Email: <span style={detailCSS}>{user.email}</span></h5>
            <Button className="float-right mx-3" onClick={this._handleEditingState.bind(this)}>Edit</Button>
        </div>
    }
    // componentDidUpdate(nextProps:any, prevState:any) {
    //     if((prevState.isLogged!==authGuard.loggedIn()) && (authGuard.loggedIn()==true)){
    //         console.log("foi")
    //     }
    // }
    render() {
        return (
            <Container className='bg-white shadow-sm my-5 py-3' style={{ borderBottom: "4px solid var(--primary)" }}>
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
                            style={{ transform: "translate(-100%, 350%)" }}
                            onClick={this._handleShowUpdatePic.bind(this)}
                        ><i className="fas fa-camera"></i></Button>
                        {this._renderUploadImageError()}
                        {this._renderPicUpload()}
                        <Loading show={this.state.isLoading} />
                    </Col>
                </Row>
            </Container>
        )
    }

}