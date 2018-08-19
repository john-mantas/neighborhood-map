import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header'
import Menu from './components/menu/Menu'
import Map from './components/map/Map'

class App extends Component {
  state = {
    map: '',
    markers: [],
    acropolisLocations: [],
    menuShowing: false,
    activeLocations: []
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
      menuShowing: !prevState.menuShowing
    }))
  }

  searchHandler = (str) => {
    // RegExp from MDN
    const term = new RegExp(str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
    let results = this.state.acropolisLocations.filter((f) => (
      term.test(f.title)
    ))
    this.setState({ activeLocations: results })
    console.log('search handled')
    this.updateMap()
    console.log('search handler updated the map')
  }

  updateMap = () => {
    let allMarkers = []
    let bounds = new window.google.maps.LatLngBounds()

    this.setState((prevState) => ({
      markers: prevState.markers.map((m) => (
        m.setVisible(false)
      ))
    }))

    console.log('markers are hidden')
    this.state.activeLocations.forEach((m, index) => {
      // Create the marker
      let marker = new window.google.maps.Marker({
        map: this.state.map,
        position: m.location,
        title: m.title,
        animation: window.google.maps.Animation.DROP,
        id: index
      });
      allMarkers.push(marker)
      bounds.extend(allMarkers[index].position)
      // Create the infoWindow
      let infoWindow = new window.google.maps.InfoWindow({
        content: m.title
      })
      marker.addListener('click', () => {
        infoWindow.open(this.state.map, marker)
      })
      window.google.maps.event.addListener(infoWindow, 'closeclick', function () {
        marker.getAnimation() && marker.setAnimation(null)
      });
    })
    console.log('map updated')
    this.state.map.fitBounds(bounds)
    this.setState({ markers: allMarkers })
    console.log('markers updated')
  }

  // https://stackoverflow.com/questions/9194579/how-to-simulate-a-click-on-a-google-maps-marker
  activateMarker = (index) => {
    window.google.maps.event.trigger(this.state.markers[index], "click")
    this.toggleMenu()
    this.state.markers[index].setAnimation(window.google.maps.Animation.BOUNCE)
  }

  componentDidMount() {
    console.log('app did mount')
    fetch('./data/acropolis.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then((response) => {
        return response.json()
      })
      .then(
        (response) => {
          this.setState({ acropolisLocations: response, activeLocations: response })
        }
      )
  }

  render() {
    console.log('app render')
    return (
      <div className="App">
        <Header toggleMenu={this.toggleMenu} />
        <main>
          <Map parentState={this.state} update={this.updateMap} />
          <Menu parentState={this.state} search={this.searchHandler}>
            {this.state.activeLocations.map((m, index) => (
              <li key={index} onClick={event => this.activateMarker(index)} role="button">
                {m.title}
              </li>
            ))}
          </Menu>
        </main>
      </div>
    );
  }
}

export default App;
