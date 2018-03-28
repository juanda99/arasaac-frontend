/*
 *
 * UploadMaterialView
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import View from 'components/View'
import MaterialForm from 'components/MaterialForm'
import { uploadMaterial } from './actions'

class UploadMaterialView extends PureComponent {

  handleSubmit(values) {
    console.log ('form submitted!')
    console.log(values.toJS())
    this.props.uploadMaterial(values.toJS())
  }

  render() {
    return (
      <View>
        <MaterialForm onSubmit={(values) => this.handleSubmit(values)} />
      </View>
    )
  }
}

UploadMaterialView.propTypes = {
  uploadMaterial: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  uploadMaterial: (formData) => {
    dispatch(uploadMaterial.request(formData))
  }
})

export default connect(null, mapDispatchToProps)(UploadMaterialView)
