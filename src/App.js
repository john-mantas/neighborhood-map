import React, { Component } from 'react'
import './App.css'
import Header from './components/header/Header'
import Menu from './components/menu/Menu'
import Map from './components/map/Map'
import Asideinfo from './components/asideInfo/AsideInfo'

class App extends Component {
  state = {
    map: '',
    markers: [],
    acropolisLocations: [],
    menuShowing: false,
    activeLocations: [],
    asideShowing: false,
    asideData: ''
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
      menuShowing: !prevState.menuShowing
    }))
  }

  toggleAside = () => {
    this.setState((prevState) => ({
      asideShowing: !prevState.asideShowing
    }))
  }

  showAside = (data) => {
    this.setState({ asideShowing: true, asideData: data })
  }

  resetMarkers = (arr) => {
    arr.forEach(marker => {
      marker.setAnimation(null)
      marker.infoWindow.close()
    })
  }

  searchHandler = (str) => {
    // RegExp from MDN
    const term = new RegExp(str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
    let results = this.state.acropolisLocations.filter((f) => (
      term.test(f.title)
    ))
    this.setState({ activeLocations: results })
    this.resetMarkers(this.state.markers)
    this.updateMap()
  }

  updateMap = () => {
    let allMarkers = []
    let bounds = new window.google.maps.LatLngBounds()

    this.setState((prevState) => ({
      markers: prevState.markers.map((m) => (
        m.setVisible(false)
      ))
    }))

    this.state.activeLocations.forEach((m, index) => {

      // Create the marker
      let marker = new window.google.maps.Marker({
        map: this.state.map,
        position: m.location,
        title: m.title,
        animation: window.google.maps.Animation.DROP,
        id: index
      })

      // Create the infoWindow
      let infoWindow = new window.google.maps.InfoWindow({
        content: `<div class="gm-infowindow">
                    <p class="gm-infowindow__title">${m.title}</p>
                    <button class="gm-infowindow__button" id=gm_btn_open-${index} data-title="${m.title}">Learn More</button>
                  </div>`
      })

      marker.infoWindow = infoWindow
      allMarkers.push(marker)
      bounds.extend(allMarkers[index].position)

      // Listeners for markers and infowindows
      marker.addListener('click', () => {
        this.resetMarkers(allMarkers)
        infoWindow.open(this.state.map, marker)
      })
      window.google.maps.event.addListener(infoWindow, 'closeclick', function () {
        marker.getAnimation() && marker.setAnimation(null)
      })
      window.google.maps.event.addListener(infoWindow, 'domready', () => {
        document.getElementById(`gm_btn_open-${index}`).addEventListener('click', (e) => {
          this.showAside(e.target.dataset.title)
          marker.getAnimation() && marker.setAnimation(null)
          infoWindow.close()
        })
      })
    })

    this.state.map.fitBounds(bounds)
    this.setState({ markers: allMarkers })
  }

  // https://stackoverflow.com/questions/9194579/how-to-simulate-a-click-on-a-google-maps-marker
  activateMarker = (index) => {
    window.google.maps.event.trigger(this.state.markers[index], "click")
    this.state.markers[index].setAnimation(window.google.maps.Animation.BOUNCE)
    window.screen.width < 1025 && this.toggleMenu()
  }

  componentDidMount() {
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
      .catch(error => {
        alert(`We couldn't retrieve the locations, try again later.`)
        console.log(error)
      })
  }

  render() {
    return (
      <div className="App">
        <Header parentState={this.state} toggleMenu={this.toggleMenu} />
        <main>
          <Menu parentState={this.state} search={this.searchHandler}>
            {this.state.activeLocations.map((m, index) => (
              <li key={index} onClick={event => this.activateMarker(index)} role="button" tabIndex="0">
                {m.title}
              </li>
            ))}
          </Menu>
          <Map parentState={this.state} update={this.updateMap} />
          <Asideinfo key={this.state.asideData} parentState={this.state} toggleAside={this.toggleAside} />
        </main>
      </div>
    );
  }
}

export default App