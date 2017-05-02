/*
 *
 * ConfigurationView
 *
 */

import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Row, Col } from 'react-flexbox-grid'
// import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import H1 from 'components/H1'
// import H2 from 'components/H2'
import H3 from 'components/H3'
import ToggleFilter from 'containers/ToggleFilter'
import View from 'components/View'
import messages from './messages'

const style = {
  padding: 20,
  textAlign: 'center',
  display: 'inline-block',
  width: '100%'
}

const ConfigurationView = () => (
  <View>
    <H1>{<FormattedMessage {...messages.searchPictograms} />}</H1>
    <Row>
      <Col xs={12} md={6}>
        <Paper style={style} zDepth={2} rounded={false}>
          <H3>{<FormattedMessage {...messages.filters} />}</H3>
          <p>{<FormattedMessage {...messages.filtersDesc} />}</p>
          <ToggleFilter label={<FormattedMessage {...messages.filterCatalog} />} type='pictograms' filter='catalog' />
          <ToggleFilter label={<FormattedMessage {...messages.filterLicense} />} type='pictograms' filter='license' />
          <ToggleFilter label={<FormattedMessage {...messages.filterSize} />} type='pictograms' filter='size' />
        </Paper>
      </Col>
    </Row>
  </View>
)

export default ConfigurationView
