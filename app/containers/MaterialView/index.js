/*
 *
 * MaterialView
 *
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import View from 'components/View'
import Helmet from 'react-helmet'
import Material from 'components/Material'
import { material } from 'containers/MaterialView/actions'
import P from 'components/P'
import { Map } from 'immutable'
import messages from './messages'

class MaterialView extends PureComponent {

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

  renderContent() {
    const { materialData, loading, params } = this.props
    const { locale } = params
    if (loading) return <p><FormattedMessage {...messages.materialLoading} /></p>
    return materialData.isEmpty()
      ? <P><FormattedMessage {...messages.materialNotFound} /> </P>
      : <Material material={materialData} locale={locale} />
  }

  render() {
    return (
      <View left={true} right={true} top={1}>
        <Helmet
          title='MaterialView'
          meta={[
            { name: 'description', content: 'Description of MaterialView' }
          ]}
        />
        {this.renderContent()}
      </View>
    )
  }
}

MaterialView.propTypes = {
  requestMaterial: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  materialData: PropTypes.object,
  loading: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
  const materialData = state.getIn(['materialsView', 'materials', parseInt(ownProps.params.idMaterial, 10)]) || Map()
  const loading = state.getIn(['materialsView', 'loading'])
  return ({
    materialData,
    loading
  })
}

const mapDispatchToProps = (dispatch) => ({
  requestMaterial: (idMaterial) => {
    dispatch(material.request(idMaterial))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MaterialView)
