/*
 *
 * apiView
 *
 */

import React, { Component } from 'react'
import SwaggerUi, { presets } from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
import View from 'components/View'
import { API_SERVER } from 'services/config'

class ApiView extends Component {
  componentDidMount() {
    SwaggerUi({
      dom_id: '#swaggerContainer',
      url: `${API_SERVER}/arasaac.json`,
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
