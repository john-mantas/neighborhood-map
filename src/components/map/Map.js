import React from 'react'
import './Map.css'

let google, map

class Map extends React.Component {
  state = {
    apiKey: 'AIzaSyBce63rAIy8_yjBNsj_y4a31r3dPh1Og-4',
    markers: []
  }

  initMap = () => {
    google = window.google
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 37.9713719, lng: 23.7264101 },
      zoom: 17
    });

    let allMarkers = []
    let bounds = new google.maps.LatLngBounds()

    this.props.parentState.acropolisLocations.map((m, index) => {
      let marker = new google.maps.Marker({
        map: map,
        position: m.location,
        title: m.title,
        animation: google.maps.Animation.DROP,
        id: index
      });
      allMarkers.push(marker)
      bounds.extend(allMarkers[index].position)
    })
    map.fitBounds(bounds)
    this.setState({ markers: allMarkers })
  }

  componentWillMount() {
    let script = document.createElement('script')
    script.setAttribute('async', '')
    script.setAttribute('defer', '')
    script.setAttribute("src", `https://maps.googleapis.com/maps/api/js?key=${this.state.apiKey}`)
    document.body.appendChild(script)
    script.addEventListener('load', this.initMap)
  }

  render() {
    return (
      <div id="map" />
    );
  }
}

export default Map