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
import { Map } from 'immutable'
import api from 'services' // just the endpoint
import {
  makeSelectHasUser,
  makeSelectPicture,
  makeSelectName,
  makeSelectEmail,
  makeSelectId
} from 'containers/App/selectors'
import userIsAuthenticated from 'utils/auth'
import { } from 'containers/App/selectors'
import { uploadMaterial } from './actions'

class UploadMaterialView extends PureComponent {

  getUserByEmail = async (email) => {
    const { token } = this.props
    return api.GET_USER_BY_EMAIL(email, token)
  }

  handleSubmit(values) {
    const formValues = values.toJS()

    // change activities, areas from [{key1, value1}, {key2, value2}].. to [key1, key2...]
    const activities = formValues.activities ?
      formValues.activities.map((activity) => (activity.value))
      : []
    const areas = formValues.areas ?
      formValues.areas.map((area) => (area.value))
      : []
    const authors = formValues.authors.map(author => author._id)
    formValues.activities = activities
    formValues.areas = areas
    formValues.authors = authors
    this.props.uploadMaterial(formValues)
  }

  render() {
    const { activities, areas, languages, name, email, picture, _id } = this.props
    const initialValues = { authors: [{ name, email, picture, _id }] }
    return (
      <View left={true} right={true}>
        <MaterialForm
          onSubmit={(values) => this.handleSubmit(values)}
          activities={activities}
          areas={areas}
          languages={languages}
          onEmailExists={this.getUserByEmail}
          initialValues={initialValues}
        />
      </View>
    )
  }
}

UploadMaterialView.propTypes = {
  uploadMaterial: PropTypes.func.isRequired,
  activities: PropTypes.instanceOf(Map),
  areas: PropTypes.instanceOf(Map),
  languages: PropTypes.instanceOf(Map)
}

const mapStateToProps = (state) => ({
  activities: state.getIn(['configuration', 'filtersData', 'activity']),
  areas: state.getIn(['configuration', 'filtersData', 'area']),
  languages: state.getIn(['configuration', 'filtersData', 'language']),
  token: makeSelectHasUser()(state),
  name: makeSelectName()(state),
  email: makeSelectEmail()(state),
  picture: makeSelectPicture()(state),
  _id: makeSelectId()(state),
})

const mapDispatchToProps = (dispatch) => ({
  uploadMaterial: (formData) => {
    dispatch(uploadMaterial.request(formData))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(userIsAuthenticated(UploadMaterialView))
