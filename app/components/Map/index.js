import React, { Component, PropTypes } from 'react'
import P from 'components/P'
import { Map as ReactMap, TileLayer, Marker, Popup } from 'react-leaflet'
import { IMAGES_URL } from 'services/config'

const address = (
  <P>
    <strong>
      Centro Aragonés para la Comunicación Aumentativa y Alternativa - ARASAAC
    </strong>
    <br />
    Andador Pilar Cuartero Molinero, 1, 50018 Zaragoza
    <br /> España (Spain)
    <br />
    <a href="tel:+34976736526"> +34 976 73 65 26</a> (10:00am - 2:00pm CET -
    Español/English)
  </P>
)

class Map extends Component {
  state = {
    lat: 41.66747,
    lng: -0.89407,
    zoom: 3,
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <ReactMap
        center={position}
        zoom={this.state.zoom}
        style={{ height: '400px', maxWidth: this.props.maxWidth }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div>
              <img
                width="150px"
                src={`${IMAGES_URL}/arasaac-logo.png`}
                alt="Screenshot"
              />
              {address}
            </div>
          </Popup>
        </Marker>
      </ReactMap>
    )
  }
}

export default Map

Map.propTypes = {
  maxWidth: PropTypes.string,
}
