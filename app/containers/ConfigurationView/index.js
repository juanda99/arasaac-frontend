/*
 *
 * ConfigurationView
 *
 */

import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import View from 'components/View'
import PictogramsFiltersConf from './PictogramsFiltersConf'
import messages from './messages'

const ConfigurationView = () => (
  <View>
    <h1>{<FormattedMessage {...messages.appConfiguration} />}</h1>
    <PictogramsFiltersConf />
  </View>
)


export default ConfigurationView
