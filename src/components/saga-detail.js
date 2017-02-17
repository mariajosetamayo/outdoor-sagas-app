import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import {Link} from 'react-router';
import moment from 'moment';


import GoogleMap from '../components/google-map';
import GoogleMapAllLocations from '../components/google-map-all-locations';
import Row from 'react-bootstrap/lib/Row'
import Image from 'react-bootstrap/lib/Image'
import Col from 'react-bootstrap/lib/Col'



export default class SagaDetail extends Component {

  // renderSagaStory (){
  //   console.log('this is the story', this.props.story)
  //   return this.props.story.split('\n').map((item, key) => {
  //     <span key={key}>{item}<br/></span>
  //   })
  // }

  render(){
    // console.log('props in render', this.props.location)

    return (
      <div className="jumbotron vertical-center sagaDetailSection" >
        <div className="sagaContainer">
          <h1 className="headingSagaDetail text-center">{this.props.selectedSaga.title}</h1>
          <br/>
          <Row>
            <Col xs={8} sm={8} md={8} className="col-xs-offset-2 col-lg-offset-3">
              <Image className="img-responsive" src={'https://s3-us-west-1.amazonaws.com/outdoor-sagas3/'+ this.props.selectedSaga.imageName} width='654px' height="408px" rounded />
            </Col>
          </Row>
          <br/>
          <Row>
            <Col xs={8} sm={8} md={8} className="col-xs-offset-2 col-lg-offset-3">
              <h3>This saga happened on {moment.parseZone(this.props.selectedSaga.date).format('dddd, MMMM Do, YYYY')} with {this.props.selectedSaga.people} in:</h3>
              <br/>
                <div className= "mapAllLocations" className="iframe-container vertical-center">
                  <GoogleMapAllLocations correctSagas={[this.props.selectedSaga]} center= {{lat:this.props.selectedSaga.location.lat, lng: this.props.selectedSaga.location.lng}} />
                </div>
            </Col>
          </Row>
          <Row>
            <Col xs={8} md={8} lg={8} className="col-xs-offset-2 col-lg-offset-3">
              <div className="storyText">{this.props.story}</div>
            </Col>
          </Row>
          <br/>
        </div>
      </div>
    )
  }
}
