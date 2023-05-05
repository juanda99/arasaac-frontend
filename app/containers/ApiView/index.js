/*
 *
 * apiView
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SwaggerUi, { presets } from 'swagger-ui'
// import 'swagger-ui/dist/swagger-ui.css'
import View from 'components/View'
import { API_SERVER } from 'services/config'
import ReadMargin from 'components/ReadMargin'
import './theme-material.css'

class ApiView extends PureComponent {
  componentDidMount() {
    SwaggerUi({
      dom_id: '#swaggerContainer',
      // url: `${API_SERVER}/arasaac_v1.json`,
      // urls: [
      //   {
      //     url: `${API_SERVER}/arasaac_v1.json`,
      //     name: 'Version1',
      //   },
      //   {
      //     url: `${API_SERVER}/arasaac_v2.json`,
      //     name: 'Version2',
      //   },
      // ],
      url: `${API_SERVER}/arasaac_v1.json`,
      presets: [presets.apis],
    })
  }

  render() {
    return (
      <View>
        <ReadMargin>
          <div id="swaggerContainer"></div>
        </ReadMargin>
      </View>
    )
  }
}

ApiView.propTypes = {
  theme: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  theme: state.get('theme'),
})

export default connect(mapStateToProps)(ApiView)
