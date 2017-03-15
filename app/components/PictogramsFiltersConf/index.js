/**
*
* PictogramsFiltersConf
*
*/

import React from 'react'
import ToggleFilter from 'containers/ToggleFilter'
import { FormattedMessage } from 'react-intl'
// import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import H3 from 'components/H3'
import messages from './messages'

const style = {
  padding: 20,
  textAlign: 'center',
  display: 'inline-block',
  width: '100%'
}

const PictogramsFiltersConf = () => (
  <div>
    <div className='row'>
      <h2>{<FormattedMessage {...messages.searchPictograms} />}</h2>
    </div>
    <div className='row'>
      <div className='col-xs-6 col-sm-12'>
        <Paper style={style} zDepth={2} rounded={false}>
          <H3>Filters</H3>
          <p>Select the filters you want to enable for searching pictograms</p>
          <ToggleFilter label={<FormattedMessage {...messages.filterCatalog} />} filter='catalog' />
          <ToggleFilter label={<FormattedMessage {...messages.filterLicense} />} filter='license' />
          <ToggleFilter label={<FormattedMessage {...messages.filterSize} />} filter='size' />
        </Paper>
      </div>
    </div>
  </div>
)

export default PictogramsFiltersConf
