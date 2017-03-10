import React, {Component} from 'react';

class GoogleMap extends Component {

  componentDidMount (){
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
    return <div className="iframe-container" ref="map" />
  }
};

export default GoogleMap
