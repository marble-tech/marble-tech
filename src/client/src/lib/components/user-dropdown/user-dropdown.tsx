import React, { Component } from 'react'
import './user-dropdown.css'
import { Link } from 'react-router-dom';
import { AuthService } from '../../../services/AuthService';
import { Image } from 'react-bootstrap';

interface Props {
  username: string;
  profileImage: string | null;
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
    const noPic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3CAMAAAAO5y+4AAAAMFBMVEXk5ueutLfp6+yrsbTa3d6xt7rW2du3vL/g4uPIzM6/xMaorrLM0NK7wMPCx8nT1tiM4Z/vAAACkUlEQVRoge2Z0XqkIAxGhYCiiL7/2y7a7XzTqULi/HHbbzk37d2ZQICYdF2j0Wg0Go1Go/H/YO3fv/dq3TylIZOWNdzltP3iI5kPiGiY74ja9kM0XyFatM02fLPu5jiqiu1KB9bd7BX32S5n2s3cq4WcClpF8VTUZvGqoh0r2oxT0J6m1BMerw11a17pCb3FtpxTDzF6pXuWNq80NmA78LTonOaGCw7Y1o7uU8A90NuxtdiU5pzdhxjoLb0Hr0TcUbJ8a453xnmP3vpT7wTzOsEyGzPANph/endg3lnkxSW0zBtR2l/iJZhXcl0h91d2joAvkuTeMAnmld1XI0qbiyuJF/gASxIad4xyESvw4q5nQVkHfQY70UIjtV3nueEu0ALasgNGf37zAiZ4v4H39uM/CFmlO/yzbKN+lmjW6DRUv4BpUbBmXEWLK2BfCL7UR1KKdmc4Fevs7Sd2pEMzeafbobQhfTeTwb3152Y3xWczRXNLI3jrta+Lj5GIYozDqLzCr+7g+t49+v23KLuwSTOudyHou7PA9fM07G8TbWz/eJ/G1QUte3bOyZvDc5R/gR/GXqP1vU7++Og+yX2asWo3GV69QZRwdd3sRd8LZgQEbbuTm7EY9BTeTLJcz0mtO/Ets12Z23oU9OUKz1bmJzXxxSfqnWA/Q77iZYxPquIkz+y31vgh9sLCtlhJiRAN0XBa0fSONStSEHM/Opli5h7b82L1opinlTT1ebA6aU7UJGPBujPh1k1cvz8A19QBqepV0ZpYaeIpJNUHwz/Y3Y3KNEvWWZdQHhvy+4FiSikNvZi/UhxIywYJMm9hodWyeaPQUhO0ey94CxuMfQBfOD9JQdNbmjtYTc61jUaj8YP5A0gxGpGxLuaTAAAAAElFTkSuQmCC"
    return (
      <React.Fragment>
        <div className='user-drop'>
        <ul className="navbar-nav">
          <li className="dropdown">
            <a
              className="py-0 nav-link"
              id="navbarDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-caret-down m-2"></i>
              { this.props.username }
              <Image src={ this.props.profileImage ? this.props.profileImage : noPic } className="mx-2" width={35} height={35} roundedCircle/>
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{left:'-35px'}}>
              <Link className="dropdown-item items" to='/dashboard'>
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
        </div>
        
      </React.Fragment>
    )
  }
}