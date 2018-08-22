import React from 'react'
import './AsideInfo.css'

class Asideinfo extends React.Component {
  state = {
    status: 'false',
    data: '',
    imageUrl: '',
    articleUrl: ''
  }

  componentDidMount() {
    const endpoint = encodeURI(`https://en.wikipedia.org/api/rest_v1/page/summary/${this.props.parentState.asideData}`)

    this.props.parentState.asideData && (
      fetch(endpoint)
        .then(response => response.json())
        .then(response => {
          this.setState({
            status: true,
            data: response,
            imageUrl: response.thumbnail.source,
            articleUrl: response.content_urls.desktop.page
          })
        })
        .catch(error => {
          this.setState({ status: false })
          console.log(error)
        }))
  }

  render() {
    return (
      <aside className={this.props.parentState.asideShowing ? "aside-container is-open" : "aside-container"}>
        <button className="aside-close" onClick={this.props.toggleAside} aria-label="close"><i className="material-icons" aria-hidden="true">close</i></button>
        {this.state.status
          ? <div>
            <div className="aside-image" role="img" aria-label={this.state.data.title} style={{ backgroundImage: `url(${this.state.imageUrl})` }}></div>
            <div className="aside-text">
              <h2 className="aside-text__header">{this.state.data.title}</h2>
              <p className="aside-text__snippet">{this.state.data.extract}</p>
              <p className="aside-text__source">Source: <a href={this.state.articleUrl} target="_blank">Wikipedia</a></p>
            </div>
          </div>
          : <h2 className="aside__not-available">We couldn't retrieve details about this location.<br />Try again later.</h2>
        }
      </aside>
    );
  }
}

export default Asideinfo