import React, { Component } from 'react'
import './user-dropdown.css'
import { Link } from 'react-router-dom';
import { AuthService } from '../../../services/AuthService';
import { Image } from 'react-bootstrap';

interface Props {
  username: string;
  profileImage: string;
}
const auth:AuthService = new AuthService;
export default class UserDropdown extends Component<Props> {

  constructor(props: Props) {
    super(props);
  }
  private _logout(){
    auth.logout();
  }
  render() {
    return (
      <React.Fragment>
        <ul className="navbar-nav mx-3">
          <li className="nav-item dropdown">
            <a
              //dropdown-toggle 
              className="btn btn-outline-secondary nav-link"
              id="navbarDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-caret-down m-2"></i>
              { this.props.username }
              <Image src="/images/profileImage.svg" className="mx-2" width={50} height={50} roundedCircle/>
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{left:'-15px'}}>
              <Link className="dropdown-item items" to='/user/user_details'>
                <i className="far fa-lg fa-user m-2 text-secondary"></i>
                <span className='m-2'>Profile</span>
              </Link>
              <Link className="dropdown-item items" to="/" onClick={this._logout}>
                <i className="fas fa-lg fa-sign-out-alt m-2 text-secondary"></i>
                <span className='m-2'>Logout</span>
              </Link>
            </div>
          </li>
        </ul>
      </React.Fragment>
    )
  }
}