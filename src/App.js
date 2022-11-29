import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Geocode from 'react-geocode';
import Data from'./store_directory.json';
Geocode.setApiKey('AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A');

const mapStyles = {
  width: '75%',
  height: '75%'
};

/* Geocode.setRegion('mx');
Geocode.setLocationType('ROOFTOP');

const findCoordinates = () => {
  console.log(Data[1].Address.geometry.location);
}

const onMapLoad = map => {
  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude: lat, longitude: lng } }) => {
      const pos = { lat, lng };
      this.setState({ currentLocation: pos });
    }
  );

};

const onPlacesChanged = () => {
  let markerArray = [];
  
  for (let i = 0; i < Data.length; i++) {
    let place = Data[i].Address.geometry.location;
    markerArray.push(place);
  }
  this.setState({ markers: markerArray });
  console.log(markerArray);
};

export class Button extends Component{
  render(){
    return(
      <button onClick={findCoordinates}>Directorio</button>
    );
  }
} */

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  
    activeMarker: {},          
    selectedPlace: {}          
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <div>
      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={
          {
            lat: 19.4284700,
            lng: -99.1276600
          }
        }
      >
      <Marker
          onClick={this.onMarkerClick}
          name={'Ciudad de México, México'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A'
})(MapContainer);
