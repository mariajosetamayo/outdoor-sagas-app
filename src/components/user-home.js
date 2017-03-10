import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Link} from 'react-router';

import SagaList from '../components/saga-list'
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';

import GoogleMapAllLocations from '../components/google-map-all-locations';
import Footer from '../components/footer';

class UserHome extends Component{
  constructor(props){
    super(props)
  };

  componentDidMount(){
    this.props.fetchMessage();
    this.props.dispatch(
      actions.fetchUserSagas()
    )
    this.props.dispatch(
      actions.fetchUserId()
    )
  };

  render(){
    console.log('THIS IS THE USER ID IN USER HOME', this.props.userId)
    return(
      <div className="userHome">
        <Jumbotron className="welcomeSection">
          <h1 className='text-center' >Welcome back!</h1>
          <p className='text-center'>Did you have a new adventure? Add it by clicking on the button below.</p>
          <div className="col-md-4 col-md-offset-4 text-center">
            <Link to = {'/add-saga'}>
              <p><Button bsStyle="warning" bsSize="large">Add a new Saga</Button></p>
            </Link>
          </div>
        </Jumbotron>
        <br/>
        <div>
          <div className="row-fluid featurette sagasAroundWorld">
            <h1 className="text-center"> Your sagas around the world</h1>
            <br/>
            <div className="col-xs-12 col-md-12 thumbnailSection">
              <SagaList correctSagas={this.props.sf} authenticated={this.props.authenticated} />
            </div>
          </div>
        </div>
        <Footer className="footer" />
      </div>
    );
  }
};

function mapStateToProps(state){
  return {
    message: state.auth.message,
    authenticated: state.auth.authenticated,
    sf:state.app.userSagas,
    userId: state.app.userId
  };
};

export default connect (mapStateToProps, actions)(UserHome);
