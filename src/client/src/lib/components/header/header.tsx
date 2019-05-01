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

    async componentDidMount(){
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
            return <UserDropdown username={username} profileImage={profileImage ? profileImage.url : null } />
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

