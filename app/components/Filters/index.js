  /**
*
* Filters
*
*/

import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import { Row, Col } from 'react-flexbox-grid'
import SelectCatalog from './SelectCatalog'
import SelectLicense from './SelectLicense'
import SelectSize from './SelectSize'
import SelectActivity from './SelectActivity'
import SelectArea from './SelectArea'
import SelectLanguage from './SelectLanguage'

const Filters = ({ filters }) => (
  <Row>
    {filters.get('area') ? <Col xs={12} md={4}><SelectArea /></Col> : null}
    {filters.get('activity') ? <Col xs={12} md={4}><SelectActivity /></Col> : null}
    {filters.get('catalog') ? <Col xs={12} md={4}><SelectCatalog /></Col> : null}
    {filters.get('size') ? <Col xs={12} md={4}><SelectSize /></Col> : null}
    {filters.get('language') ? <Col xs={12} md={4}><SelectLanguage /></Col> : null}
    {filters.get('license') ? <Col xs={12} md={4}><SelectLicense /></Col> : null}
  </Row>
)
Filters.propTypes = {
  filters: PropTypes.instanceOf(Map)
}

export default Filters
