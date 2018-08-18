import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header'
import Map from './components/map/Map'

class App extends Component {
  state = {
    acropolisLocations: []
  }

  componentDidMount() {
    fetch('./data/acropolis.json', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then((response) => {
      return response.json()
    })
    .then(
      (response) => {
        this.setState({ acropolisLocations: response })
      }
    )
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Map />
        </main>
      </div>
    );
  }
}

export default App;
