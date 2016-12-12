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

const Filters = ({ filters }) => (
  <Row>
    {filters.get('catalog') ? <Col xs={12} md={4}><SelectCatalog /></Col> : null}
    {filters.get('size') ? <Col xs={12} md={4}><SelectSize /></Col> : null}
    {filters.get('license') ? <Col xs={12} md={4}><SelectLicense /></Col> : null}
  </Row>
)
Filters.propTypes = {
  filters: PropTypes.instanceOf(Map)
}

export default Filters
