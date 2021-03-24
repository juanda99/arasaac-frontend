/*
 *
 * PictogramsView
 *
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import View from 'components/View'
import ReadMargin from 'components/ReadMargin'
import P from 'components/P'
import Helmet from 'react-helmet'
import muiThemeable from 'material-ui/styles/muiThemeable'
import userIsAuthenticated from 'utils/auth'
import { DEFAULT_LIST } from 'utils'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import FavoriteList from 'components/FavoriteList'
import { downloadPictogram, downloadList } from 'services'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import {
  deleteFavorite,
  addFavorite,
  addList,
  renameList,
  deleteList,
} from 'containers/App/actions'
import {
  makeSelectHasUser,
  makeSelectId,
  makeSelectFavorites,
  makeSelectRootFavorites,
} from 'containers/App/selectors'
import {
  makeLoadingSelector,
  makeListSelector,
  makeFavoritePictogramsSelector,
} from 'containers/PictogramsView/selectors'
import {
  favoritePictograms,
  favoriteListSelect,
} from 'containers/PictogramsView/actions'
import api from 'services'
import messages from './messages'

class FavoritesView extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    listName: '',
  }

  async componentDidMount() {
    const { requestFavorites, locale, token, favorites } = this.props

    //  TODO: just ask once this stuff, once the app is open, depending on locale!!!
    if (favorites) {
      const [...lists] = favorites.keys()
      const favoriteIds = lists.map((list) => {
        // .flat() not for edge & explorer
        // return favorites.get(list).toJS()).flat()
        const tmpIds = favorites.get(list).toJS()
        return [].concat(...tmpIds)
      })
      await requestFavorites(locale, favoriteIds, token)
    }
  }

  async componentWillReceiveProps(nextProps) {
    const { requestFavorites, locale, token, favorites } = this.props
    if (nextProps.favorites !== favorites) {
      if (favorites) {
        const [...lists] = favorites.keys()
        const favoriteIds = lists.map((list) => {
          // .flat() not for edge & explorer
          // return favorites.get(list).toJS()).flat()
          const tmpIds = favorites.get(list).toJS()
          return [].concat(...tmpIds)
        })
        await requestFavorites(locale, favoriteIds, token)
      }
    }
  }

  handleAddFavorite = (props) => {
    const { addFavorite, deleteFavorite, token } = this.props
    const fileName = props._id
    const listName = props.listName
    addFavorite(fileName, listName, token)
    /* we remove material from defaultList */
    if (listName !== DEFAULT_LIST) deleteFavorite(fileName, DEFAULT_LIST, token)
  }

  handleDeleteFavorite = (fileName, listName) => {
    const { deleteFavorite, token } = this.props
    deleteFavorite(fileName, listName, token)
  }

  handleFavoriteListSelect = (listName) => {
    this.props.favoriteListSelect(listName)
  }

  handleDeleteList = (listName) => {
    const { deleteList, token } = this.props
    deleteList(listName, token)
  }

  handleListNameChange = (e) => {
    this.setState({
      listName: e.target.value,
    })
  }

  handleAddList = () => {
    const { addList, token } = this.props
    addList(this.state.listName, token)
    this.setState({ listName: '' })
  }

  handleRenameList = (listName, newListName) => {
    const { renameList, token } = this.props
    renameList(listName, newListName, token)
  }

  handleDownloadList = (listName) => {
    const { id } = this.props
    const location = downloadList(listName, id)
    window.location = location
  }

  handleDownload = (idPictogram, keyword) => {
    const location = downloadPictogram(idPictogram, keyword)
    window.location = location
  }

  render() {
    const {
      favorites,
      selectedList,
      favoritePictograms,
      intl,
      loading,
    } = this.props
    const { formatMessage } = intl
    return (
      <View left={true} right={true}>
        <ReadMargin>
          <Helmet
            title="Favorites View"
            meta={[{ name: 'description', content: 'Pictogram favorites' }]}
          />

          <TextField
            hintText={formatMessage(messages.addFolderHint)}
            floatingLabelText={formatMessage(messages.folderName)}
            style={{ marginRight: 10 }}
            value={this.state.listName}
            onChange={this.handleListNameChange}
          />
          <RaisedButton
            label={<FormattedMessage {...messages.addFolder} />}
            primary={true}
            onClick={this.handleAddList}
            disabled={!this.state.listName}
          />
          {favoritePictograms && !loading && (
            <FavoriteList
              items={favorites}
              onSelect={this.handleFavoriteListSelect}
              selectedList={selectedList}
              onDelete={this.handleDeleteList}
              onDeleteFavorite={this.handleDeleteFavorite}
              onDownloadList={this.handleDownloadList}
              onDownload={this.handleDownload}
              onRename={this.handleRenameList}
              listPictograms={favoritePictograms}
              onDrop={this.handleAddFavorite}
            />
          )}

          {favoritePictograms && loading && (
            <P>
              <FormattedMessage {...messages.loadingFavorites} />
            </P>
          )}
        </ReadMargin>
      </View>
    )
  }
}

FavoritesView.propTypes = {
  // Injected by React Router
  locale: PropTypes.string.isRequired,
  addFavorite: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
  renameList: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  favorites: PropTypes.object.isRequired,
  requestFavorites: PropTypes.func.isRequired,
  selectedList: PropTypes.string.isRequired,
  favoriteListSelect: PropTypes.func.isRequired,
  favoritePictograms: PropTypes.arrayOf(PropTypes.object),
  intl: intlShape.isRequired,
  router: PropTypes.any.isRequired,
  id: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  locale: makeSelectLocale()(state),
  loading: makeLoadingSelector()(state),
  token: makeSelectHasUser()(state),
  favorites: makeSelectFavorites()(state),
  selectedList: makeListSelector()(state),
  favoritePictograms: makeFavoritePictogramsSelector()(state),
  rootFavorites: makeSelectRootFavorites()(state),
  id: makeSelectId()(state),
})

const mapDispatchToProps = (dispatch) => ({
  requestFavorites: (locale, idFavorites, token) => {
    dispatch(favoritePictograms.request(locale, idFavorites, token))
  },
  deleteFavorite: (fileName, listName, token) => {
    dispatch(deleteFavorite.request(fileName, listName, token))
  },
  addList: (listName, token) => {
    dispatch(addList.request(listName, token))
  },
  deleteList: (listName, token) => {
    dispatch(deleteList.request(listName, token))
  },
  renameList: (listName, newListName, token) => {
    dispatch(renameList.request(listName, newListName, token))
  },
  favoriteListSelect: (listName) => {
    dispatch(favoriteListSelect(listName))
  },
  addFavorite: (fileName, listName, token) => {
    dispatch(addFavorite.request(fileName, listName, token))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(injectIntl(userIsAuthenticated(FavoritesView))))
