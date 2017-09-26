/*
 *
 * MaterialsView
 *
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import View from 'components/View'
import Helmet from 'react-helmet'
import Material from 'components/Material'
import { material } from 'containers/MaterialView/actions'
import { Map } from 'immutable'
import messages from './messages'

class MaterialView extends React.Component {

  componentDidMount() {
    if (this.props.materialData.isEmpty()) {
      this.props.requestMaterial(this.props.params.idMaterial)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.params.idMaterial !== nextProps.params.idMaterial) {
      this.props.requestMaterial(nextProps.params.idMaterial)
    }
  }

  render() {
    const { materialData, locale } = this.props
    return (
      <View>
        <Helmet
          title='MaterialView'
          meta={[
            { name: 'description', content: 'Description of MaterialView' }
          ]}
        />
        {materialData.isEmpty() ? <p><FormattedMessage {...messages.materialNotFound} /> </p> : <Material material={materialData} locale={locale} /> }
      </View>
    )
  }
}

MaterialView.propTypes = {
  requestMaterial: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  materialData: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  const locale = state.get('language').get('locale')
  const materialData = state.getIn(['materialsView', 'materials', ownProps.params.idMaterial]) || Map()
  return ({
    materialData,
    locale
  })
}

const mapDispatchToProps = (dispatch) => ({
  requestMaterial: (idMaterial) => {
    dispatch(material.request(idMaterial))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MaterialView)
