import React from 'react'
import './Menu.css'

class Menu extends React.Component {
  state = {
    query: ''
  }

  search = (str) => {
    this.setState({ query: str })
    this.props.search(str)
  }

  render() {
    return (
      <nav className={this.props.parentState.menuShowing ? "menu is-open" : "menu"}>
        <div className="search">
          <div className="search__button">
            <i className="material-icons">search</i>
          </div>
          <input
            type="search"
            className="search__input"
            placeholder="Search for a place..."
            value={this.state.query}
            onChange={(e) => { this.search(e.target.value) }}
          />
        </div>
        <ul className="places-list">
          {this.props.children}
        </ul>
      </nav>

    );
  }
}

export default Menu