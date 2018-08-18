import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header'
import Menu from './components/menu/Menu'
import Map from './components/map/Map'

class App extends Component {
  state = {
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
    // RegExp from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    const term = new RegExp(str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
    let results = this.state.acropolisLocations.filter((f) => (
      term.test(f.title)
    ))
    this.setState({ activeLocations: results })
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
  }

  render() {
    return (
      <div className="App">
        <Header toggleMenu={this.toggleMenu} />
        <main>
          <Map parentState={this.state} />
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
