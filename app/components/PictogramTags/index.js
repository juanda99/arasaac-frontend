import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import Chip from 'material-ui/Chip'

const styles = {
  chip: {
    margin: '4px'
  }
}

const PictogramTags = ({searchText, selectedTags, categories}) => {

  const tags = selectedTags.map((id) => {
      const key = areas.filter(item => item.code === id)[0].text
      return (
        <Chip style={styles.chip} key={id} onClick={() => this.handleAreaClick(id)}>
          <FormattedMessage {...classificationMessages[key]} />
        </Chip>
      )
    })
  return (
    <div>
      <p>pruebarrrrrrr*****************</p>
    </div>
  )
}

PictogramTags.propTypes = {
  searchText: PropTypes.string,
  selectedTags: PropTypes.array,
  cagegories: PropTypes.object.isRequired,
}


export default PictogramTags
