import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import { Home } from '../../../app/pages/home/home';

interface NavbarItem {
    isIndex?: boolean;
    title: string;
    href: string;
}

interface HeaderProps{
    items:NavbarItem []
}

interface HeaderState{

}

export class Header extends React.Component<HeaderProps, HeaderState>{
    private _renderNavItems(items:NavbarItem[]){
        return (
            items.filter((i:NavbarItem) => i.isIndex !== true).map((item, key) => {
                return (
                    <Link className="nav-link" to={item.href} key={key} >
                        {item.title}
                    </Link>
                );
            })
        )
    }
    render(){
        return (

            <Navbar bg="dark" variant="dark" className="sticky-top bg-winter">
                <Link className="" to="/" ><img
                    src="/images/logo2.png"
                    width="125"
                    height="50"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"/>
                </Link>
                <Nav className="ml-auto">
                    {this._renderNavItems(this.props.items)}
                </Nav>
                <Nav className="" id="userMenu">
                    <NavDropdown title="" id="basic-nav-dropdown" className="d-flex flex-row-reverse">
                    <NavDropdown.Item href="">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="">Separated link</NavDropdown.Item>
                </NavDropdown>
                <Image src="/images/profileImage.svg" width={50} height={50} roundedCircle/>
                </Nav>
                
            </Navbar>
        )
        
    }

}