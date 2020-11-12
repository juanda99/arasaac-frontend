/**
*
* Showcase
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import FullWidthSection from 'components/FullWidthSection'
import { IMAGES_URL, PICTOGRAMS_URL } from 'services/config'
import H2 from 'components/H2'
import messages from './messages'
import Item from './Item'

const Showcase = ({ locale }) => {
  return (
    <FullWidthSection style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', color: 'white' }}>
      <div style={{width: '100%'}}>
        <H2 primary={true}>{<FormattedMessage {...messages.whatIsARASAAC} />}</H2>
      </div>
      
      <Item
        title={<FormattedMessage {...messages.aacSymbols} />}
        route='/pictograms/search'
        image={`${IMAGES_URL}/pictograms.jpg`}
      />

      <Item
        title={<FormattedMessage {...messages.materials} />}
        route='/materials/search'
        image={`${IMAGES_URL}/materiales.jpg`}
      />

      <Item
        title='Aula Abierta'
        route='http://aulaabierta.arasaac.org/'
        image={`${IMAGES_URL}/aula-abierta.jpg`}
      />

      <Item
        title={<FormattedMessage {...messages.whatIsAAC} />}
        route={`/aac/${locale}`}
        image={`${PICTOGRAMS_URL}/36723/36723_300.png`}
      />

    </FullWidthSection>
  )
}


Showcase.propTypes = {
  locale: PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  filters: makeFiltersSelector()(state),
  showFilter: makeShowFiltersSelector()(state),
  locale: makeSelectLocale()(state),
})

export default Showcase

