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
import Helmet from 'react-helmet'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import FavoriteList from 'components/FavoriteList'
import { withRouter } from 'react-router'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import {
  deleteFavorite,
  addFavorite,
  addList,
  renameList,
  deleteList
} from 'containers/App/actions'
import {
  makeSelectHasUser,
  makeSelectFavorites
} from 'containers/App/selectors'
import {
  makeLoadingSelector,
  makeListSelector,
  makeFavoritePictogramsSelector
} from 'containers/PictogramsView/selectors'
import {
  favoritePictograms,
  toggleShowFilter,
  favoriteListSelect
} from 'containers/PictogramsView/actions'
import messages from './messages'

class FavoritesView extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    listName: ''
  };

  async componentDidMount() {
    const { requestFavorites, locale, token, favorites, router } = this.props

    //  TODO: just ask once this stuff, once the app is open, depending on locale!!!
    if (favorites && token) {
      const [...lists] = favorites.keys()
      const favoriteIds = lists.map((list) => {
        // .flat() not for edge & explorer
        // return favorites.get(list).toJS()).flat()
        const tmpIds = favorites.get(list).toJS()
        return [].concat(...tmpIds)
      })
      await requestFavorites(locale, favoriteIds, token)
    }
    if (!token) router.push('/signin')
  }

  handleAddFavorite = (props) => {
    const { addFavorite, token } = this.props
    const fileName = props._id
    const listName = props.listName
    addFavorite(fileName, listName, token)
  };

  handleDeleteFavorite = (fileName, listName) => {
    const { deleteFavorite, token } = this.props
    deleteFavorite(fileName, listName, token)
  };

  handleFavoriteListSelect = (listName) => {
    this.props.favoriteListSelect(listName)
  };

  handleDeleteList = (listName) => {
    const { deleteList, token } = this.props
    deleteList(listName, token)
  };

  handleListNameChange = (e) => {
    this.setState({
      listName: e.target.value
    })
  };

  handleAddList = () => {
    const { addList, token } = this.props
    addList(this.state.listName, token)
    this.setState({ listName: '' })
  };

  handleRenameList = (listName, newListName) => {
    const { renameList, token } = this.props
    renameList(listName, newListName, token)
  };

  handleDownloadList = (listName) => {
    console.log(`Download list ${listName}`)
  };

  render() {
    const { favorites, selectedList, favoritePictograms, intl, token } = this.props

    const { formatMessage } = intl
    return (
      <View left={true} right={true}>
        <Helmet
          title='Favorites View'
          meta={[{ name: 'description', content: 'Pictogram favorites' }]}
        />

        <TextField
          hintText={formatMessage(messages.addListHint)}
          floatingLabelText={formatMessage(messages.listName)}
          style={{ marginRight: 10 }}
          value={this.state.listName}
          onChange={this.handleListNameChange}
        />
        <RaisedButton
          label={<FormattedMessage {...messages.addList} />}
          primary={true}
          onClick={this.handleAddList}
          disabled={!this.state.listName}
        />
        {!!token && <FavoriteList
          items={favorites}
          onSelect={this.handleFavoriteListSelect}
          selectedList={selectedList}
          onDelete={this.handleDeleteList}
          onDeleteFavorite={this.handleDeleteFavorite}
          onDownload={this.handleDownloadList}
          onRename={this.handleRenameList}
          listPictograms={favoritePictograms}
          onDrop={this.handleAddFavorite}
        />}

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
  router: PropTypes.any.isRequired
}

const mapStateToProps = (state) => ({
  locale: makeSelectLocale()(state),
  loading: makeLoadingSelector()(state),
  token: makeSelectHasUser()(state),
  favorites: makeSelectFavorites()(state),
  selectedList: makeListSelector()(state),
  favoritePictograms: makeFavoritePictogramsSelector()(state)
})

const mapDispatchToProps = (dispatch) => ({
  requestFavorites: (locale, idFavorites, token) => {
    dispatch(favoritePictograms.request(locale, idFavorites, token))
  },
  toggleShowFilter: () => {
    dispatch(toggleShowFilter())
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
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(muiThemeable()(injectIntl(FavoritesView))))
