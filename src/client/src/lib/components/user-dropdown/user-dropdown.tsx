import React, { Component } from 'react'
import './user-dropdown.css'
import { Link } from 'react-router-dom';

interface Props {
  username: string;
  profileImage: string;
}

export default class UserDropdown extends Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <button
              className="dropdown-toggle btn btn-outline-primary user-drop"
              id="navbarDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {this.props.username}
            </button>
            <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item items" to='/user/user_details'>
                <i className="fas fa-lg fa-user-astronaut m-2 text-primary"></i>
                <span className='m-2'>Profile</span>
              </Link>
              <Link className="dropdown-item items" to={'/'}>
                <i className="fas fa-lg fa-sign-out-alt m-2 text-primary"></i>
                <span className='m-2'>Logout</span>
              </Link>
            </div>
          </li>
        </ul>
      </React.Fragment>
    )
  }
}