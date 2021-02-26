import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { PICTOGRAMS_URL } from 'services/config'
import IconButton from 'material-ui/IconButton'
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import Favorite from 'material-ui/svg-icons/action/favorite'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import { keywordSelector } from 'utils'
import { FormattedMessage } from 'react-intl'
import CardActions from './CardActions'
import StyledPaper from './StyledPaper'
import StyledList from './StyledList'
import AACImage from './AACImage'
import Image from './Image'
import Item from './Item'
import messages from './messages'

class PictogramSnippet extends PureComponent {
  state = {
    zDepth: 1,
  }

  styles = {
    icon: {
      width: 48,
      height: 48,
    },
    leftIconButton: {
      width: 96,
      height: 96,
      padding: 24,
      position: 'absolute',
      top: '0',
      left: '0',
    },
    rightIconButton: {
      width: 96,
      height: 96,
      padding: 24,
      position: 'absolute',
      opacity: 100,
      top: '0',
      right: '0',
    },
    cardTitle: {
      textAlign: 'center',
      fontSize: '1.4rem',
      textTransform: 'uppercase',
      color: this.props.muiTheme.appBar.textColor,
      fontWeight: '900',
    },
  }

  handleMouseEnter = () => {
    this.setState({
      zDepth: 3,
    })
  }

  handleClickFavorite = (event) => {
    const {
      pictogram: { _id },
      onClickFavorite,
    } = this.props
    const id = _id.toString().replace('aac', '')
    event.preventDefault()
    onClickFavorite(id)
  }

  handleDownload = (event) => {
    const {
      pictogram: { _id, keywords },
      searchText,
      onDownload,
    } = this.props
    event.preventDefault()
    const { keyword } = keywordSelector(searchText, keywords)
    onDownload(_id, keyword)
  }

  handleMouseLeave = () => {
    this.setState({
      zDepth: 1,
    })
  }

  render() {
    const {
      pictogram: { _id, keywords, sex, violence, aac, aacColor },
      searchText,
      muiTheme,
      locale,
      showExtra,
      isFavorite,
      color,
    } = this.props
    let blur = false

    // hack remove aac from _id when replicate pictogram to remove color for AAC purposes
    const id = _id.toString().replace('aac', '')

    // this.props.sex means hideSex, violence hideViolence
    if (this.props.sex && sex) blur = true
    if (this.props.violence && violence) blur = true
    const { keyword } = keywordSelector(searchText, keywords)
    let fileUrl, url
    let showAACIcon = false
    if (aac && !aacColor) showAACIcon = true
    if (isNaN(_id)) {
      showAACIcon = true
      /* it's a replicated pictogram to remove color */
      fileUrl = `${PICTOGRAMS_URL}/${id}/${id}_nocolor_500.png`
      url = `/pictograms/${locale}/${id}/${encodeURIComponent(
        keyword
      )}?type=aac`
    } else {
      url = `/pictograms/${locale}/${_id}/${encodeURIComponent(keyword)}`
      fileUrl = color
        ? `${PICTOGRAMS_URL}/${_id}/${_id}_300.png`
        : `${PICTOGRAMS_URL}/${_id}/${_id}_nocolor_500.png`
    }

    const { isAuthenticated } = this.context
    return (
      <StyledList
        key={_id}
        className="image-element-class"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <StyledPaper zDepth={this.state.zDepth}>
          <Item url={url}>
            <div style={{ position: 'relative' }}>
              <Image src={fileUrl} alt={keyword} blur={blur} />
              {isFavorite && (
                <IconButton
                  touch={true}
                  // https://github.com/react-dnd/react-dnd/issues/577
                  // we can use tooltip as we are using customDragLayer
                  tooltip={<FormattedMessage {...messages.addFavorite} />}
                  iconStyle={this.styles.icon}
                  style={this.styles.rightIconButton}
                  onClick={this.handleClickFavorite}
                >
                  <Favorite
                    color={muiTheme.palette.primary1Color}
                    hoverColor={muiTheme.palette.accent1Color}
                  />
                </IconButton>
              )}
              {showAACIcon && (
                <AACImage src="https://static.arasaac.org/pictograms/27685/27685_300.png" />
              )}
              <CardActions color={true}>
                {showExtra && isAuthenticated && (
                  <IconButton
                    touch={true}
                    // https://github.com/react-dnd/react-dnd/issues/577
                    // we can use tooltip as we are using customDragLayer
                    tooltip={
                      isFavorite ? (
                        <FormattedMessage {...messages.deleteFavorite} />
                      ) : (
                        <FormattedMessage {...messages.addFavorite} />
                      )
                    }
                    iconStyle={this.styles.icon}
                    style={this.styles.rightIconButton}
                    onClick={this.handleClickFavorite}
                  >
                    {isFavorite ? (
                      <Favorite
                        color={muiTheme.appBar.textColor}
                        hoverColor={muiTheme.palette.accent1Color}
                      />
                    ) : (
                      <FavoriteBorder
                        color={muiTheme.appBar.textColor}
                        hoverColor={muiTheme.palette.accent1Color}
                      />
                    )}
                  </IconButton>
                )}
                {showExtra && (
                  <IconButton
                    touch={true}
                    tooltip={<FormattedMessage {...messages.download} />}
                    iconStyle={this.styles.icon}
                    style={this.styles.leftIconButton}
                    onClick={this.handleDownload}
                  >
                    {!blur && (
                      <FileDownload
                        color={muiTheme.appBar.textColor}
                        hoverColor={muiTheme.palette.accent1Color}
                      />
                    )}
                  </IconButton>
                )}
                <p style={this.styles.cardTitle}>{keyword}</p>
              </CardActions>
            </div>
          </Item>
        </StyledPaper>
      </StyledList>
    )
  }
}

PictogramSnippet.contextTypes = {
  isAuthenticated: PropTypes.bool,
}

PictogramSnippet.propTypes = {
  pictogram: PropTypes.object.isRequired,
  searchText: PropTypes.string,
  muiTheme: PropTypes.object,
  locale: PropTypes.string.isRequired,
  showExtra: PropTypes.bool,
  onClickFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool,
  onDownload: PropTypes.func.isRequired,
  sex: PropTypes.bool.isRequired,
  violence: PropTypes.bool.isRequired,
  color: PropTypes.bool.isRequired,
}

export default muiThemeable()(PictogramSnippet)
