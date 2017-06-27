/*
 *
 * apiView
 *
 */

import React, { Component } from 'react'
import SwaggerUi, { presets } from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
import View from 'components/View'

class ApiView extends Component {
  componentDidMount() {
    SwaggerUi({
      dom_id: '#swaggerContainer',
      url: 'https://api.arasaac.org/arasaac.json',
      presets: [presets.apis]
    })
  }

  render() {
    return (
      <View>
        <div id='swaggerContainer'>
        </div>
      </View>
    )
  }
}

export default ApiView
