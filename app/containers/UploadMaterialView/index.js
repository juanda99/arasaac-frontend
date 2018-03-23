/*
 *
 * UploadMaterialView
 *
 */

import React, { PureComponent } from 'react'
import View from 'components/View'
import MaterialForm from 'components/MaterialForm'

class UploadMaterialView extends PureComponent {

  handleSubmit(values) {
    console.log ('form submitted!')
    console.log(values)
  }

  handleSubmit = (values) => {
    console.log(values)
    console.log('pepe')
  }

  render() {
    return (
      <View>
        <MaterialForm onSubmit={(values) => this.handleSubmit(values)} />
      </View>
    )
  }
}

export default UploadMaterialView
