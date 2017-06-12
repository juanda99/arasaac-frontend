/*
 *
 * UploadMaterialView
 *
 */

import React, { PureComponent } from 'react'
import View from 'components/View'
import MaterialForm from 'components/MaterialForm'

class UploadMaterialView extends PureComponent {

  handleSubmit () {
    console.log ('form submitted!')
  }

  render() {
    return (
      <View>
        <MaterialForm handleSubmit={this.handleSubmit} />
      </View>
    )
  }
}

export default UploadMaterialView
