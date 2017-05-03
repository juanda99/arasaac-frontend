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
import H2 from 'components/H2'
// import H2 from 'components/H2'
import H3 from 'components/H3'
import ToggleFilter from 'containers/ToggleFilter'
import View from 'components/View'
import messages from './messages'

const style = {
  padding: 20,
  textAlign: 'center',
  display: 'inline-block',
  width: '100%',
  height: '250px'
}

const ConfigurationView = () => (
  <View>
    <Row>
      <Col xs={12} lg={6}>
        <H2>{<FormattedMessage {...messages.searchPictograms} />}</H2>
        <Paper style={style} zDepth={2} rounded={false}>
          <H3>{<FormattedMessage {...messages.filters} />}</H3>
          <p>{<FormattedMessage {...messages.pictogramFiltersDesc} />}</p>
          <ToggleFilter label={<FormattedMessage {...messages.filterCatalog} />} type='pictograms' filter='catalog' />
          <ToggleFilter label={<FormattedMessage {...messages.filterLicense} />} type='pictograms' filter='license' />
          <ToggleFilter label={<FormattedMessage {...messages.filterSize} />} type='pictograms' filter='size' />
        </Paper>
      </Col>
      <Col xs={12} lg={6}>
        <H2>{<FormattedMessage {...messages.searchMaterials} />}</H2>
        <Paper style={style} zDepth={2} rounded={false}>
          <H3>{<FormattedMessage {...messages.filters} />}</H3>
          <p>{<FormattedMessage {...messages.materialFiltersDesc} />}</p>
          <ToggleFilter label={<FormattedMessage {...messages.filterArea} />} type='materials' filter='area' />
          <ToggleFilter label={<FormattedMessage {...messages.filterActivity} />} type='materials' filter='activity' />
          <ToggleFilter label={<FormattedMessage {...messages.filterLanguage} />} type='materials' filter='language' />
          <ToggleFilter label={<FormattedMessage {...messages.filterLicense} />} type='materials' filter='license' />
        </Paper>
      </Col>
    </Row>
  </View>
)

export default ConfigurationView
