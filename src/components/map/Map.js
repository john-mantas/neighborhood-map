import React from 'react'
import './Map.css'

class Map extends React.Component {
  state = {
    apiKey: 'AIzaSyBce63rAIy8_yjBNsj_y4a31r3dPh1Og-4'
  }

  initMap = () => {
    this.props.parentState.map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 37.9713719, lng: 23.7264101 },
      zoom: 16,
      styles: [
        {
          "featureType": "administrative.locality",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#000000"
            },
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "color": "#ffffff"
            },
            {
              "weight": "0.75"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "color": "#ded7c6"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "color": "#ded7c6"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "lightness": 100
            },
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "lightness": 700
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
            {
              "color": "#c3a866"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ]
    });
    this.props.update()
  }

  errorHandler = () => {
    alert('An error occured while loading the map')
  }

  gm_authFailure() {
    window.alert("Google Maps authentication failed")
  }

  componentWillMount() {
    let mapScript = document.createElement('script')
    mapScript.setAttribute('async', '')
    mapScript.setAttribute('defer', '')
    mapScript.setAttribute("src", `https://maps.googleapis.com/maps/api/js?key=${this.state.apiKey}`)
    document.body.appendChild(mapScript)
    mapScript.onerror = this.errorHandler
    mapScript.onload = this.initMap
  }

  componentDidMount() {
    window.gm_authFailure = this.gm_authFailure;
  }

  render() {
    return (
      <div id="map" role="application" aria-label="Map" />
    );
  }
}

export default Map