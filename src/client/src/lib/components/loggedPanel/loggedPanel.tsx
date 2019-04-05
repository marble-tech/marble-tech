import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import { AuthService } from '../../../services/AuthService';
import { Link } from 'react-router-dom';


const auth = new AuthService;
export class LoggedPanel extends React.Component{
    private _logout(){
        auth.logout();
    }
    render(){
        return (
            <Nav className="" id="userMenu">
                <NavDropdown title="" id="basic-nav-dropdown" className="d-flex flex-row-reverse">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                    <NavDropdown.Item>Another action</NavDropdown.Item>
                    <NavDropdown.Item>Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item ><Link to="/" onClick={this._logout}>Logout</Link></NavDropdown.Item>
                </NavDropdown>
                <Image src="/images/profileImage.svg" width={50} height={50} roundedCircle/>
            </Nav>
        )
        
    }

}