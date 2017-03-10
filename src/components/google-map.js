import React, {Component} from 'react';

class GoogleMap extends Component {

  componentDidMount (){
    console.log('these are the props in the map', this.props.location)
    const map = new google.maps.Map(this.refs.map, {
      zoom: 12,
      center: {
        lat: this.props.lat,
        lng: this.props.lng
      }
    });
    new google.maps.Marker({
      position: {
        lat: this.props.lat,
        lng: this.props.lng
      },
      map: map,
      title: 'saga map'
    })
  };

  render (){
    // this.refs.map can be used as a direct reference as a component that has been rendered to the page
    return <div className="iframe-container" ref="map" />
  }
};

export default GoogleMap
