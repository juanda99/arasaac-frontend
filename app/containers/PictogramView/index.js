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
import { categories } from 'containers/PictogramsView/actions'
import { makeCategoriesSelectorByLocale } from 'containers/PictogramsView/selectors'
import { addFavorite } from 'containers/App/actions'
import P from 'components/P'
import api, { downloadCustomPictogram } from 'services'
import { DEFAULT_LIST } from 'utils'
import { 
  makeSelectHasUser,
  makeSelectSexPictograms,
  makeSelectViolencePictograms
 } from 'containers/App/selectors'
import { pictogram } from './actions'
import { makePictogramByIdSelector } from './selectors'
import messages from './messages'

// TODO: Añadir logo de arasaac como identificador. Esto será útil para cuando se obligue
// a hacer la descarga de los pictogramas con mención a Arasaac

class PictogramView extends PureComponent {
  componentDidMount() {

    const { params: {locale, idPictogram}, pictogramData, categories, requestCategories, } = this.props
    if (pictogramData.isEmpty()) {
      this.props.requestPictogram(idPictogram, locale)
    }

    const categoriesDate = sessionStorage.getItem(`categoriesDate_${locale}`)
    let diffSeconds = categoriesDate ? (actualDate.getTime() - categoriesDate) / 1000 : 0 
    if (!categories || categories.size === 0 || diffSeconds > 86400) requestCategories()

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.params.idPictogram !== nextProps.params.idPictogram) {
      this.props.requestPictogram(
        nextProps.params.idPictogram,
        this.props.params.locale
      )
    }
  }
  // also used in pictogramsView
  handleDownload = (fileName, base64Data) => {
    const promiseFileName = api.GENERATE_CUSTOM_PICTOGRAM({
      fileName,
      base64Data
    })
    promiseFileName.then((data) => {
      const location = downloadCustomPictogram(data.fileName)
      window.location = location
      // window.open(downloadCustomPictogram(data.fileName), '_blank')
    })
  }


  handleAddFavorite = (fileName) => {
    const { addFavorite, token } = this.props
    addFavorite(fileName, DEFAULT_LIST, token)
  }

  renderContent() {
    const {
      pictogramData,
      loading,
      token,
      params: { locale, searchText },
      categories,
      sex,
      violence
    } = this.props
    if (loading) {
      return (
        <P>
          <FormattedMessage {...messages.pictogramLoading} />
        </P>
      )
    }
    return pictogramData.isEmpty() ? (
      <P>
        <FormattedMessage {...messages.pictogramNotFound} />{' '}
      </P>
    ) : (
        <Pictogram
          pictogram={pictogramData}
          locale={locale}
          searchText={searchText || ''}
          authenticated={!!token}
          onDownload={this.handleDownload}
          onAddFavorite={this.handleAddFavorite}
          categories={categories}
          sex={sex}
          violence={violence}
        />
      )
  }

  render() {
    return (
      <View left={true} right={true} top={0} readMargin={false}>
        <Helmet
          title='PictogramView'
          meta={[
            { name: 'description', content: 'Description of PictogramView' }
          ]}
        />
        {this.renderContent()}
      </View>
    )
  }
}

PictogramView.propTypes = {
  requestPictogram: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  pictogramData: PropTypes.object,
  loading: PropTypes.bool,
  addFavorite: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const pictogramData = makePictogramByIdSelector()(state, ownProps)
  const loading = state.getIn(['pictogramsView', 'loading'])
  const token = makeSelectHasUser()(state)
  const categories = makeCategoriesSelectorByLocale()(state)
  const sex = makeSelectSexPictograms()(state)
  const violence = makeSelectViolencePictograms()(state)
  return {
    pictogramData,
    loading,
    token,
    categories,
    sex, violence
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestPictogram: (idPictogram) => {
    dispatch(pictogram.request(idPictogram, ownProps.params.locale))
  },
  addFavorite: (fileName, listName, token) => {
    dispatch(addFavorite.request(fileName, listName, token))
  },
  requestCategories: () => {
    dispatch(categories.request(ownProps.params.locale))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PictogramView)
