/*
 *
 * ConfigurationView
 *
 */

import React from 'react'
import { FormattedMessage } from 'react-intl'
import View from 'components/View'
import PictogramsFiltersConf from 'components/PictogramsFiltersConf'
import Iframe from 'react-iframe'
import messages from './messages'

const ConfigurationView = () => (
  <View>
  <Iframe url='http://localhost:8000/api-docs' />
    <h1>{<FormattedMessage {...messages.appConfiguration} />}</h1>
    <PictogramsFiltersConf />
  </View>
)


export default ConfigurationView
