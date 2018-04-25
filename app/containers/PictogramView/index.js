/*
 *
 * PictogramView
 *
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import View from 'components/View'
import Helmet from 'react-helmet'
import Pictogram from 'components/Pictogram'
import { pictogram } from 'containers/PictogramView/actions'
import P from 'components/P'
import { Map } from 'immutable'
import messages from './messages'

class PictogramView extends PureComponent {

  componentDidMount() {
    if (this.props.pictogramData.isEmpty()) {
      this.props.requestPictogram(this.props.params.idPictogram)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.params.idPictogram !== nextProps.params.idPictogram) {
      this.props.requestPictogram(nextProps.params.idPictogram)
    }
  }

  renderContent() {
    const { pictogramData, loading, locale } = this.props
    if (loading) return <p><FormattedMessage {...messages.materialLoading} /></p>
    return pictogramData.isEmpty()
        ? <P><FormattedMessage {...messages.pictogramNotFound} /> </P>
        : <Pictogram pictogram={pictogramData} locale={locale} />
  }

  render() {
    return (
      <View left={true} right={true}>
        <Helmet
          title='PictogramView'
          meta={[
            { name: 'description', content: 'Description of PictogramView' }
          ]}
        />
        { this.renderContent() }
      </View>
    )
  }
}

PictogramView.propTypes = {
  requestPictogram: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  pictogramData: PropTypes.object,
  loading: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
  const locale = state.get('language').get('locale')
  const pictogramData = state.getIn(['pictogramsView', 'pictograms', parseInt(ownProps.params.idPictogram, 10)]) || Map()
  const loading = state.getIn(['pictogramsView', 'loading'])
  return ({
    pictogramData,
    locale,
    loading
  })
}

const mapDispatchToProps = (dispatch) => ({
  requestPictogram: (idPictogram) => {
    dispatch(pictogram.request(idPictogram))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PictogramView)
