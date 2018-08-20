import React from 'react'
import './AsideInfo.css'

class Asideinfo extends React.Component {
  state = {
    status: 'false',
    data: '',
    imageUrl: ''
  }

  componentDidMount() {
    const endpoint = encodeURI(`https://en.wikipedia.org/api/rest_v1/page/summary/parthenon`)

    fetch(endpoint)
      .then(response => response.json())
      .then(response => {
        this.setState({ status: true, data: response, imageUrl: response.thumbnail.source })
      })
      .catch(error => {
        this.setState({status: false})
        console.log(error)
      })
  }

  render() {
    return (
      <aside className="aside-container">
        {this.state.status 
          ?<div>
          <div className="aside-image" style={{ backgroundImage: `url(${this.state.imageUrl})` }}></div>
          <div className="aside-text">
            <h2 className="aside-text__header">{this.state.data.title}</h2>
            <p className="aside-text__snippet">{this.state.data.extract}</p>
          </div>
        </div>
        :<h2 className="aside-text__header">No details available</h2>  
      }
      <button className="aside-close"><i className="material-icons">close</i></button>
      </aside>
    );
  }
}

export default Asideinfo