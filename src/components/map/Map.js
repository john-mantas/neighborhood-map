import React from 'react'
import './Map.css'

let google

class Map extends React.Component {
  state = {
    apiKey: 'AIzaSyBce63rAIy8_yjBNsj_y4a31r3dPh1Og-4'
  }

  initMap = () => {
    google = window.google
    this.props.parentState.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 37.9713719, lng: 23.7264101 },
      zoom: 17
    });
    this.props.update()
    console.log('initMap updated the map')
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
      <div id="map" role="application" aria-label="Map" />
    );
  }
}

export default Map