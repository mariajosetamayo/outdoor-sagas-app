import React, {Component} from 'react';
import {connect} from 'react-redux';

export default class GoogleMapAllLocations extends Component {
  constructor (props){
    super(props)
  };

  componentDidMount (){
    this.map = new google.maps.Map(this.refs.map, {
      zoom: 2,
      center: {
        lat: 0,
        lng: 0
      },
      scrollwheel: false,
    });
  };

  render () {
    const markers = this.props.correctSagas.map((saga) =>{
      let coordinatesArray = [];
      let individualCoordinatesArray = [];
      individualCoordinatesArray.push (saga.location.lat, saga.location.lng);
      coordinatesArray.push(individualCoordinatesArray);
      return coordinatesArray;
    });

    for ( var i = 0; i< markers.length; i++){
      var sagaLocation = markers[i]
      sagaLocation.map((item) =>{
        var marker = new google.maps.Marker({
          position: {lat:item[0], lng: item[1]},
          map: this.map,
          title: 'all saga places'
        });
      })
    }
    return <div ref="map" />
  };
};
