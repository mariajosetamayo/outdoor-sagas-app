import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router';
import * as actions from '../actions/index';

import GoogleMapAllLocations from '../components/google-map-all-locations';

export default class SagaList extends Component {
  constructor(props){
    super(props)
  };

  renderSagaThumbnails (){
    var sectionStyle = {
      display: 'inline-block',
      float: 'none',
      fontSize: '20px',
      color: '#282828',
      fontWeight: 'bold',
      textShadow: '0.5px 0.5px 0.5px #000000',
    };

    return this.props.correctSagas.map((saga, index) =>{
      return (
        <div className="col-xs-8 col-sm-8 col-md-4">
          <li
            key={index} className="thumbnail" style={sectionStyle} user={this.props.user}>
              <Link to={'/saga/' + saga._id} >
                <img src={'https://s3-us-west-1.amazonaws.com/outdoor-sagas3/'+ saga.imageName} />
                <br/>
                {saga.title.length>29 ? saga.title.substring(0, 29) + '...' : saga.title}
              </Link>
          </li>
        </div>
      )
    })
  };

  renderTitleForSagas (){
    if(this.props.authenticated){
      return <h1 className="text-center titleUserHome2">Your Sagas</h1>
    }else{
      return <h1 className="titleHome2 text-center">Explore Sagas</h1>
    }
  };

  render(){
    return(
      <div>
        <div className="mapAllLocations" className= "iframe-container col-centered" >
          <GoogleMapAllLocations correctSagas={this.props.correctSagas} />
        </div>
        <hr className="featurette-divider"  />
        {this.renderTitleForSagas()}
        <br/>
        <br/>
        <div className="container sagaThumnailsContainer">
          <div className="row">
            <div className="col-xs-12 col-md-12">
              {this.renderSagaThumbnails()}
            </div>
          </div>
        </div>
      </div>
    )
  };
};
