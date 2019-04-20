import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import * as authGuard from '../../../helpers/authGuard';
import UserDropdown from '../user-dropdown/user-dropdown';
import './header.css';
import { AuthService } from '../../../services/AuthService';
import { Loading } from '../loading/loading';

interface NavbarItem {
    isIndex?: boolean;
    title: string;
    href: string;
    onlyGuest: boolean;
    isProtected:boolean;
}

interface HeaderProps{
    items:NavbarItem []
    history?:any
    location?:any
    match?:any
}

interface HeaderState{
    isLogged:boolean;
    isLoading: boolean;
    user:{
        userId:number,
        username:string,
        profileImage:any,
    } | null;
}
const auth:AuthService = new AuthService;
export class Header extends React.Component<HeaderProps, HeaderState>{
    public constructor(props: HeaderProps) {
        super(props);
            this.state = {
                isLoading:false,
                isLogged:authGuard.loggedIn(),
                user: null
            }
        };
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
                items.filter((i:NavbarItem) => i.isProtected !== true).map((item, key) => {
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
        if(authGuard.loggedIn() && !!this.state.user){
            let {username, profileImage} = this.state.user!;
            return <UserDropdown username={username} profileImage={profileImage.url} />
        }
        return <div></div>
    }
    private _loadData(){
        this.setState({isLoading: true});
        (async()=>{
            await auth.authUser()
                .then((res:any)=>{
                    let user = {
                        userId: res.id,
                        username: res.username,
                        profileImage: res.profileImage,
                    } 
                    
                    this.setState({user: user});
                }).catch((e:any)=>{
                    console.log(e)
                })
                this.setState({isLoading: false});
        })()
    }
    componentDidMount(){
        this._loadData()
    }
    render(){
        return (

            <Navbar bg="white" variant="light" className="sticky-top shadow-sm border-bottom border-primary py-0">
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
                <Loading show={this.state.isLoading}/>
            </Navbar>
        )
        
    }

}