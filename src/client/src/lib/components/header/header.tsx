import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import * as authGuard from '../../../helpers/authGuard';
import UserDropdown from '../user-dropdown/user-dropdown';

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
    componentDidUpdate(nextProps:any, prevState:any) {
        if((prevState.isLogged!==authGuard.loggedIn()) && (authGuard.loggedIn()==true)){
            console.log("foi")
        }
    }
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
            return <UserDropdown username="username" profileImage="image" />
        }
        return <div></div>
    }
    render(){
        return (

            <Navbar bg="white" variant="light" className="sticky-top shadow-sm">
                <Link className="mx-3" to="/" ><img
                    src="/images/logo2.png"
                    width="125"
                    height="50"
                    className="d-inline-block align-top"/>
                </Link>
                <Nav className="ml-auto">
                    {this._renderNavItems(this.props.items)}
                </Nav>{this._renderUserPanel()}
               
            </Navbar>
        )
        
    }

}