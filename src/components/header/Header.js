import React from 'react'
import './Header.css'

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <button className="header__menu-btn" onClick={this.props.toggleMenu}>
          <i className="material-icons">
            {this.props.parentState.menuShowing ? `close` : `search`}
          </i>
        </button>
        <h1 className="header__title">ACROPOLIS TOUR</h1>
      </header>
    );
  }
}

export default Header