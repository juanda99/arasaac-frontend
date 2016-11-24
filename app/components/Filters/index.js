/**
*
* Filters
*
*/

import React, { PropTypes } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import SelectCatalog from './SelectCatalog'
import SelectLicense from './SelectLicense'
import SelectSize from './SelectSize'

const Filters = ({ filters }) => (
  <Row>
    {filters.catalog ? <Col xs={12} md={4}><SelectCatalog /></Col> : null}
    {filters.size ? <Col xs={12} md={4}><SelectSize /></Col> : null}
    {filters.license ? <Col xs={12} md={4}><SelectLicense /></Col> : null}
  </Row>
)
Filters.propTypes = {
  filters: PropTypes.object.isRequired
}

export default Filters
