import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import * as authGuard from '../../../helpers/authGuard';
import UserDropdown from '../user-dropdown/user-dropdown';
import './header.css';

interface NavbarItem {
    isIndex?: boolean;
    title: string;
    href: string;
    onlyGuest: boolean;
}

interface HeaderProps{
    items:NavbarItem []
    history?:any
    location?:any
    match?:any
}

interface HeaderState{
    isLogged:boolean;
}

export class Header extends React.Component<HeaderProps, HeaderState>{
    public constructor(props: HeaderProps) {
        super(props);
            this.state = {isLogged:authGuard.loggedIn()}
        };
    // componentDidUpdate(nextProps:any, prevState:any) {
    //     if((prevState.isLogged!==authGuard.loggedIn()) && (authGuard.loggedIn()==true)){
    //         console.log("foi")
    //     }
    // }
    private _renderNavItems(items:NavbarItem[]){
        const { location } = this.props;
        let p = location.pathname.split("/")
        
        if(authGuard.loggedIn()){
            return (
                items.filter((i:NavbarItem) => i.onlyGuest !== true).map((item, key) => {
                    let prefix = item.href.split("/");
                    return (
                        <div key={key} className={"row no-gutters align-items-center"+(p[1] === prefix[1]? ' navActive':'')} style={{height:"70px"}}>
                            <Link className="nav-link align-items-center" to={item.href}  >
                                {item.title}
                            </Link>
                        </div>
                    );
                })
            )
        }else{
            return (
                items.map((item, key) => {
                    let prefix = item.href.split("/");
                    return (
                        <div key={key} className={"row no-gutters align-items-center"+(p[1] === prefix[1]? ' navActive':'')} style={{height:"70px"}}>
                            <Link className="nav-link" to={item.href} key={key}>
                                {item.title}
                            </Link>
                        </div>
                        
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

            <Navbar bg="white" variant="light" className="sticky-top shadow-sm border-bottom border-primary pb-0">
                <Link className="mx-3" to="/" ><img
                    src="/images/logo2.png"
                    width="125"
                    height="50"
                    className="d-inline-block align-top"/>
                </Link>
                <Nav className="ml-auto align-items-center">
                    {this._renderNavItems(this.props.items)}
                    {this._renderUserPanel()}
                </Nav>
               
            </Navbar>
        )
        
    }

}
//style={{height:"75px"}}