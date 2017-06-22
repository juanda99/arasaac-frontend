/*
 *
 * apiView
 *
 */

import React, { Component } from 'react'
import SwaggerUi, { presets } from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'

class ApiView extends Component {
  componentDidMount() {
    SwaggerUi({
      dom_id: '#swaggerContainer',
      url: 'http://api.arasaac.org/arasaac.json',
      presets: [presets.apis]
    })
  }

  render() {
    return (
      <div id='swaggerContainer' />
    )
  }
}

export default ApiView


/*
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
  <View style={{ height: '10000px' }}>
    <div style={{ container }}>
      <Iframe url='//api.arasaac.org/api-docs' width={'100%'} height={'100%'} />
    </div>
  </View>
)


export default ApiView

*/