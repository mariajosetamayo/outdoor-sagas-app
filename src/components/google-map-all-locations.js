import React, {Component} from 'react';
import {connect} from 'react-redux';

export default class GoogleMapAllLocations extends Component {
  constructor (props){
    //console.log('this are the props in the map', props.userSagas)
    super(props)
  }

  componentDidMount (){
    // TODO: debe funcionar tb asi este componente
    // <GoogleMap  correctSagas={this.props.correctSagas} center={ {lat: 12310, lng: 35345} }/>
    // console.log('location', this.props.correctSagas[0].location.lat)
    // this.center = this.props.center ? this.props.center : {lat: 0, lng: 0}
    this.map = new google.maps.Map(this.refs.map, {
      zoom: 2,
      center: {
        lat: 0,
        lng: 0
      },
      scrollwheel: false,
    });
  }


  render () {


    const markers = this.props.correctSagas.map((saga) =>{
      let coordinatesArray = []

      let individualCoordinatesArray = []
      individualCoordinatesArray.push (saga.location.lat, saga.location.lng)
      coordinatesArray.push(individualCoordinatesArray)
      return coordinatesArray
    });

    //console.log('these are the locations',markers)

    for ( var i = 0; i< markers.length; i++){
      var sagaLocation = markers[i]
      //console.log('this is the lat of marker', sagaLocation)
      sagaLocation.map((item) =>{
        //console.log('this is the item inside map function', item)
        var marker = new google.maps.Marker({
          position: {lat:item[0], lng: item[1]},
          map: this.map,
          title: 'all saga places'
        });
      })
    }

    return <div ref="map" />
  }
}
