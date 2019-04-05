import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import * as authGuard from '../../../helpers/authGuard';
import { LoggedPanel } from '../loggedPanel/loggedPanel';
import { Container } from 'react-bootstrap';

interface NavbarItem {
    isIndex?: boolean;
    title: string;
    href: string;
    onlyGuest: boolean;
}

interface HeaderProps{
    items:NavbarItem []
    history?:any
}

interface HeaderState{
    isLogged:boolean;
}

export class Header extends React.Component<HeaderProps, HeaderState>{
    public constructor(props: HeaderProps) {
        super(props);
            this.state = {isLogged:authGuard.loggedIn()}
        };
    private _renderNavItems(items:NavbarItem[]){
        if(authGuard.loggedIn()){
            return (
                items.filter((i:NavbarItem) => i.onlyGuest !== true).map((item, key) => {
                    return (
                        <Link className="nav-link" to={item.href} key={key} >
                            {item.title}
                        </Link>
                    );
                })
            )
        }else{
            return (
                items.map((item, key) => {
                    return (
                        <Link className="nav-link" to={item.href} key={key} >
                            {item.title}
                        </Link>
                    );
                })
            )
        }

        
    }
    private _renderUserPanel(){
        if(authGuard.loggedIn()){
            return <LoggedPanel/>
        }
        return <div></div>
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
                </Nav>{this._renderUserPanel()}
               
            </Navbar>
        )
        
    }

}