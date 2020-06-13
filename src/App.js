import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
export class App extends Component {

  constructor(props) {
    super(props);

    this.centerPos = {
      centerLAT: 0.0, centerLNG: 0.0// the initial center position of the maps
    }
    this.mapZoom = {
      factor: 10 //this is used to control the map zooming intially the zoom factor fixed as 10
    }
    this.state = {
      stores: [
        { latitude: 47.359423, longitude: -122.021071 },
        { latitude: 47.2052192687988, longitude: -121.988426208496 },
        { latitude: 47.6307081, longitude: -122.1434325 },
        { latitude: 47.3084488, longitude: -122.2140121 },
        { latitude: 47.5524695, longitude: -122.0425407 }
      ]
    }
  }
  changingMapVisuality = () => {
    let counter = 0;
    let pos1 = 0, pos2 = 0;
    this.state.stores.map((store, index) => {
      pos1 = pos1 + store.latitude; //this line sum the all the latitude value from the array so we could find the center position
      pos2 = pos2 + store.longitude;// this line also does the same thing but it is for longtitude
      counter++;
    })

    if (counter === 1) {
      //if there is only one location then we will set that location as a centerposition Latitude
      // also we will set the zooming factor to 12
      this.mapZoom.factor = 12;
      this.centerPos.centerLAT = pos1;// it will be assign as the new center position latitude
      this.centerPos.centerLNG = pos2;// it will be assign as the new center position longtitude

    } else {
      //see the above comments
      // here we will find the center position of the map by dividing all the sum of latitude and longtitude
      // like if we have 5 location latitude such as 1,2,3,4,5 then (1+2+3+4+5)/5 =3 as the centerpositon latitude
      this.mapZoom.factor = 9;
      this.centerPos.centerLAT = pos1 / counter;
      this.centerPos.centerLNG = pos2 / counter;

    }

  }

  markers = () => {
    //this method will return the markers of each location
    return this.state.stores.map((store, index) => {
      return (<Marker key={index} id={index} position={{
        lat: store.latitude,
        lng: store.longitude
      }}
      />)
    })
  }

  render() {
    const mapStyles = {
      width: '100%',
      height: '100%',
    };

    return (

      <div>
        {this.changingMapVisuality()}
        < Map
          google={this.props.google}//initializing props
          zoom={this.mapZoom.factor} //intializing zoom
          style={mapStyles} //initializing map styles
          initialCenter={{ lat: this.centerPos.centerLAT, lng: this.centerPos.centerLNG }//this will center the map along location
          }


        >
          {this.markers()}


        </Map >

      </div>

    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'put your api key here buddy'
})(App);