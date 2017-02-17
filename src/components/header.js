import React , {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import Navbar from 'react-bootstrap/lib/navbar'
import * as actions from '../actions/index';

class Header extends Component {
  constructor(props){
    super(props)
  }

  renderLinks(){
    if(this.props.authenticated){
      // Show a link to signout
      return [
        <li className="nav-item btn btn-warning userHomeBtn" key={4}>
          <Link className="nav-link" to = "/user-home">My Profile</Link>
        </li>,
        <li className="nav-item btn btn-warning" key={3}>
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
      ]
    }else{
      //show a link to sign in or sign up
      return [
        <li className = "nav-item btn btn-warning" key={1}>
          <Link className="nav-link" to="/signin" >Sign In</Link>
        </li>,
        <li className = "nav-item btn btn-warning" key={2}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ];
    }
  }

  render(){
    return (

      <nav className = "navbar navbar-fixed-top navbar-toggleable-md navBar">
        <div className = "container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggler"  data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link to= "/" className="navbar-brand logo">Outdoor Sagas</Link>
          </div>
         <div className=" navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav pull-right accountLinks">
              {this.renderLinks()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps (state){
  return {
    authenticated: state.auth.authenticated,
    state: state
  };
}

export default connect(mapStateToProps)(Header);
