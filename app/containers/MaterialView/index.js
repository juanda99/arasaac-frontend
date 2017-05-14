/*
 *
 * MaterialsView
 *
 */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import View from 'components/View'
import Helmet from 'react-helmet'
import Material from 'components/Material'
import { material } from 'containers/MaterialsView/actions'
import messages from './messages'

class MaterialsView extends React.Component {

  componentWillMount() {
    if (this.props.params.idMaterial) {
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
        {material ? <Material material={materialData} locale={locale} /> : <p><FormattedMessage {...messages.materialNotFound} /> </p>}
      </View>
    )
  }
}

MaterialsView.propTypes = {
  requestMaterial: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  materialData: PropTypes.object.isRequired
}


const mapStateToProps = (state, ownProps) => {
  const locale = state.get('language').get('locale')
  const materialData = state.getIn(['materials', ownProps.params.idMaterial]) || {}
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

export default connect(mapStateToProps, mapDispatchToProps)(MaterialsView)
