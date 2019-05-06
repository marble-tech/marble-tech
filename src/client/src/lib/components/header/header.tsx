import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, withRouter } from 'react-router-dom';
import * as authGuard from '../../../helpers/authGuard';
import UserDropdown from '../user-dropdown/user-dropdown';
import './header.css';
import { AuthService } from '../../../services/AuthService';
import { Loading } from '../loading/loading';
import { withAuth } from '../withAuth/withAuth';
import { routes } from '../../../app/config/routing';

interface NavbarItem {
    isIndex?: boolean;
    title: string;
    href: string;
    onlyGuest: boolean;
    isProtected: boolean;
}

interface HeaderProps {
    items: NavbarItem[]
    authToken?: string | null;
    location?: any;
    actualPath?: any;
}

interface HeaderState {
    isLogged: boolean;
    isLoading: boolean;
    user: {
        userId: number,
        username: string,
        profileImage: any,
    } | null;
}
const auth: AuthService = new AuthService;

export class _Header extends React.Component<HeaderProps, HeaderState>{
    public constructor(props: HeaderProps) {
        super(props);
        this.state = {
            isLoading: false,
            isLogged: authGuard.loggedIn(),
            user: null,
        }
    };


    async componentWillMount(){
        if(this.props.authToken){
            await this._loadData();
        }
    }
    async componentDidUpdate() {
        if(!this.state.user && this.props.authToken){
            await this._loadData()
        }

        if(this.props.authToken && this.state.user){
            if(localStorage.getItem('marbleLoggedUser')){
                const newUser = JSON.parse(localStorage.getItem('marbleLoggedUser')!);
                if(
                    this.state.user.username !== newUser.username
                ) {
                    let user = this.state.user;
                    user=newUser;
                    this.setState({user});
                }
                if(
                    this.state.user.profileImage && 
                    (this.state.user.profileImage.url !== newUser.profileImage.url)
                ){
                    console.log('On update', newUser);
                    let user = this.state.user;
                    user.profileImage = newUser.profileImage;
                    this.setState({user});
                }
                if(!this.state.user.profileImage && newUser.profileImage !== null){
                    let user = this.state.user;
                    user.profileImage = newUser.profileImage;
                    this.setState({user});
                }
                
                
            }
        }
        
    }

    private async _loadData() {
        try {
            const loggedUser = await auth.authUser();
            this.setState({user: {
                userId: loggedUser.id,
                username: loggedUser.username,
                profileImage: loggedUser.profileImage
            }});
            
        }catch(error) {
            console.log(error);
        }
    }

    render() {
        return (

            <Navbar bg="white" variant="light" className="sticky-top shadow-sm border-bottom border-primary py-0">
                <Link className="mx-3" to="/" ><img
                    src="/images/logo2.png"
                    width="125"
                    height="50"
                    className="d-inline-block align-top" />
                </Link>
                <Nav className="ml-auto align-items-center">
                    {this._renderNavItems(this.props.items)}
                    {this._renderUserPanel()}
                </Nav>
                <Loading show={this.state.isLoading} />
            </Navbar>
        )

    }

    private _renderNavItems(items: NavbarItem[]) {
        const { location } = this.props;
        let p = location.pathname.split("/")
        if (authGuard.loggedIn()) {
            return (
                items.filter((i: NavbarItem) => i.onlyGuest !== true).map((item, key) => {
                    let prefix = item.href.split("/");
                    return (
                        <div key={key} className={"row no-gutters align-items-center"+(p[1] === prefix[1]? ' navActive':'') } style={{ height: "70px" }}>
                            <Link className="nav-link align-items-center" to={item.href}  >
                                {item.title}
                            </Link>
                        </div>
                    );
                })
            )
        } else {
            return (
                items.filter((i: NavbarItem) => i.isProtected !== true).map((item, key) => {
                    let prefix = item.href.split("/");
                    return (
                        <div key={key} className={"row no-gutters align-items-center"+(p[1] === prefix[1]? ' navActive':'')} style={{ height: "70px" }}>
                            <Link className="nav-link" to={item.href} key={key}>
                                {item.title}
                            </Link>
                        </div>

                    );
                })
            )
        }
    }

    private _renderUserPanel() {
        if (authGuard.loggedIn() && !!this.state.user) {
            let { username, profileImage } = this.state.user!;
            console.log('header profileImage: ' , this.state.user);
            return <UserDropdown username={username} profileImage={profileImage !== null ? profileImage.url : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3CAMAAAAO5y+4AAAAMFBMVEXk5ueutLfp6+yrsbTa3d6xt7rW2du3vL/g4uPIzM6/xMaorrLM0NK7wMPCx8nT1tiM4Z/vAAACkUlEQVRoge2Z0XqkIAxGhYCiiL7/2y7a7XzTqULi/HHbbzk37d2ZQICYdF2j0Wg0Go1Go/H/YO3fv/dq3TylIZOWNdzltP3iI5kPiGiY74ja9kM0XyFatM02fLPu5jiqiu1KB9bd7BX32S5n2s3cq4WcClpF8VTUZvGqoh0r2oxT0J6m1BMerw11a17pCb3FtpxTDzF6pXuWNq80NmA78LTonOaGCw7Y1o7uU8A90NuxtdiU5pzdhxjoLb0Hr0TcUbJ8a453xnmP3vpT7wTzOsEyGzPANph/endg3lnkxSW0zBtR2l/iJZhXcl0h91d2joAvkuTeMAnmld1XI0qbiyuJF/gASxIad4xyESvw4q5nQVkHfQY70UIjtV3nueEu0ALasgNGf37zAiZ4v4H39uM/CFmlO/yzbKN+lmjW6DRUv4BpUbBmXEWLK2BfCL7UR1KKdmc4Fevs7Sd2pEMzeafbobQhfTeTwb3152Y3xWczRXNLI3jrta+Lj5GIYozDqLzCr+7g+t49+v23KLuwSTOudyHou7PA9fM07G8TbWz/eJ/G1QUte3bOyZvDc5R/gR/GXqP1vU7++Og+yX2asWo3GV69QZRwdd3sRd8LZgQEbbuTm7EY9BTeTLJcz0mtO/Ets12Z23oU9OUKz1bmJzXxxSfqnWA/Q77iZYxPquIkz+y31vgh9sLCtlhJiRAN0XBa0fSONStSEHM/Opli5h7b82L1opinlTT1ebA6aU7UJGPBujPh1k1cvz8A19QBqepV0ZpYaeIpJNUHwz/Y3Y3KNEvWWZdQHhvy+4FiSikNvZi/UhxIywYJMm9hodWyeaPQUhO0ey94CxuMfQBfOD9JQdNbmjtYTc61jUaj8YP5A0gxGpGxLuaTAAAAAElFTkSuQmCC" } />
        }
        return <div></div>
    }

}
const H = withRouter((props)=> <_Header {...props} items={
    routes.filter(item => item.displayInNavBar !== false)
        .map(item => {
            return {
                href: item.href,
                isIndex: item.isIndex,
                title: item.title,
                onlyGuest: item.onlyGuest || false,
                isProtected: item.isProtected || false
            };
        })
}/>)

export const Header = withAuth((props) => <H {...props}/>)

