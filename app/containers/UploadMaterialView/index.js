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
    const formValues = values.toJS()

    // change activities, areas from [{key1, value1}, {key2, value2}].. to [key1, key2...]
    const activities = formValues.activities ?
      formValues.activities.map((activity) => (activity.value))
      : []
    const areas = formValues.areas ?
      formValues.areas.map((area) => (area.value))
      : []
    formValues.activities = activities
    formValues.areas = areas
    this.props.uploadMaterial(formValues)
  }

  render() {
    return (
      <View left={true} right={true}>
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
