import React from 'react'
import './Menu.css'

class Menu extends React.Component {
  render() {
    return (
      <nav className={this.props.parentState.menuShowing?"menu is-open":"menu"}>
        <form>
          <div className="search">
            <input
              type="search"
              className="search__input"
              placeholder="Search for a place..."
              required
            />
            <button className="search__button">
              <i className="material-icons">search</i>
            </button>
          </div>
        </form>
        <ul className="places-list">
          {this.props.parentState.acropolisLocations.map((m, index) => (
            <li key={index}>{m.title}</li>
          ))}
        </ul>
      </nav>

    );
  }
}

export default Menu