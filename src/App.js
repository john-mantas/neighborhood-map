import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header'
import Menu from './components/menu/Menu'
import Map from './components/map/Map'

class App extends Component {
  state = {
    acropolisLocations: [],
    menuShowing: false
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
       menuShowing: !prevState.menuShowing
    }))
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
          this.setState({ acropolisLocations: response })
        }
      )
  }

  render() {
    return (
      <div className="App">
        <Header toggleMenu={this.toggleMenu} />
        <main>
          <Map parentState={this.state} />
          <Menu parentState={this.state} />
        </main>
      </div>
    );
  }
}

export default App;
