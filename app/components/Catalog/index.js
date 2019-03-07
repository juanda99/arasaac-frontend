import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import { STORAGE_URL } from 'services/config'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

const style = {
  margin: 12
}

const Catalog = ({
  colorPictograms,
  variations,
  size,
  totalPictograms,
  lastUpdated,
  language
}) => {
  const catalogURL = `${STORAGE_URL}/catalog_${language}.zip`
  return (
    <div>
      <h3>Catalog data</h3>
      <p>Number of pictograms: </p>
      <p>{totalPictograms}</p>
      <p>Size: </p>
      <p>{size}</p>
      <p>Last Updated: </p>
      <p>{lastUpdated}</p>
      <a href={catalogURL}>
        <RaisedButton
          label={<FormattedMessage {...messages.download} />}
          primary={true}
          style={style}
        />
      </a>
    </div>
  )
}

Catalog.propTypes = {
  colorPictograms: PropTypes.number,
  variations: PropTypes.number,
  size: PropTypes.string,
  totalPictograms: PropTypes.string,
  lastUpdated: PropTypes.string,
  language: PropTypes.string
}

export default Catalog
