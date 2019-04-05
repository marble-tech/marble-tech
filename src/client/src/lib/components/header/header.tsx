import React from 'react';
import { Link } from 'react-router-dom';
import { postsRoutes } from '../../../app/config/posts-routing';
import './header.css'
import { Content } from '../content/content';
import { Route } from 'react-router-dom';


interface NavbarItem {
    isIndex?: boolean;
    title: string;
    href: string;
}

interface HeaderProps {
    items: NavbarItem[]
}

interface HeaderState {

}

export class Header extends React.Component<HeaderProps, HeaderState>{

    private _renderNavItems(items: NavbarItem[]) {
        return (
            items.filter((i: NavbarItem) => i.isIndex !== true).map((item, key) => {
                if (item.title === 'Tutorial') {
                    return (
                        <li className="nav-item dropdown" key={key}>
                            <Link className="nav-link dropdown-toggle text-dark" to={item.href} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className='items'>Tutorial</span>
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                
                                {
                                postsRoutes.map((route, i) => {
                                    return (
                                        <React.Fragment>
                                            <span data-toggle="collapse" data-target=".navbar-collapse.show"><Link className='dropdown-item' to={route.path} key={i}>{route.title}</Link></span>
                                        </React.Fragment>
                                    ) 
                                })
                                }
                            </div>
                        </li>
                    );
                }else{
                    return (
                        <li data-toggle="collapse" data-target=".navbar-collapse.show" className='nav-item' key={key}><Link className="nav-link" to={item.href} key={key} >
                            <span className='items' >{item.title}</span>
                        </Link></li>
                    );
                }
            })
        )
    }

    render() {
        return (
            <React.Fragment>
                <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-dark bg-winter">
                    <Link className="navbar-brand" to='/'><img
                        src="/images/logo2.png"
                        width="125"
                        height="50"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            {this._renderNavItems(this.props.items)}
                        </ul>
                    </div>
                </nav>
            </React.Fragment>


            // <Navbar bg="dark" variant="dark" className="sticky-top bg-winter">
            //     <Link className="" to="/" ><img
            //         src="/images/logo2.png"
            //         width="125"
            //         height="50"
            //         className="d-inline-block align-top"
            //         alt="React Bootstrap logo"/>
            //     </Link>
            //     <Nav className="ml-auto">
            //         {this._renderNavItems(this.props.items)}
            //     </Nav>
            //     <Nav className="" id="userMenu">
            //         <NavDropdown title="" id="basic-nav-dropdown" className="d-flex flex-row-reverse">
            //         <NavDropdown.Item href="">Profile</NavDropdown.Item>
            //         <NavDropdown.Item href="">Another action</NavDropdown.Item>
            //         <NavDropdown.Item href="">Something</NavDropdown.Item>
            //         <NavDropdown.Divider />
            //         <NavDropdown.Item href="">Separated link</NavDropdown.Item>
            //     </NavDropdown>
            //     <Image src="/images/profileImage.svg" width={50} height={50} roundedCircle/>
            //     </Nav>

            // </Navbar>
        )

    }

}