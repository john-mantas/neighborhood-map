import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header'
import Map from './components/map/Map'

class App extends Component {
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
