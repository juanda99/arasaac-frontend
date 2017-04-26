/*
 *
 * apiView
 *
 */

import React from 'react'
import View from 'components/View'
import Iframe from 'react-iframe'

const container = {
  position: 'relative',
  // height: '1000',
  overflow: 'auto',
  paddingBottom: '75%',
  zIndex: '10000'
}

const ApiView = () => (
  <View style={{ height: '10000' }}>
    <div style={{ container }}>
      <Iframe url='http://localhost:8100/api-docs' width={'100%'} height={'100%'} />
    </div>
  </View>
)


export default ApiView

