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
      let marker = new window.google.maps.Marker({
        map: this.state.map,
        position: m.location,
        title: m.title,
        animation: window.google.maps.Animation.DROP,
        id: index
      });
      allMarkers.push(marker)
      bounds.extend(allMarkers[index].position)
    })
    this.state.map.fitBounds(bounds)
    this.setState({ markers: allMarkers })
    console.log('map updated')
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
              <li key={index}>{m.title}</li>
            ))}
          </Menu>
        </main>
      </div>
    );
  }
}

export default App;
