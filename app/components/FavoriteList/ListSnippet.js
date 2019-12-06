import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import muiThemeable from 'material-ui/styles/muiThemeable'
import IconButton from 'material-ui/IconButton'
import Badge from 'material-ui/Badge'
import { DEFAULT_LIST } from 'utils'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { FormattedMessage } from 'react-intl'
import CardActions from 'components/PictogramSnippet/CardActions'
import StyledPaper from 'components/PictogramSnippet/StyledPaper'
import StyledList from 'components/PictogramSnippet/StyledList'
import Folder from 'material-ui/svg-icons/file/folder'
import ListMenu from './ListMenu'
import messages from './messages'

class ListSnippet extends PureComponent {
  styles = {
    icon: {
      width: 35,
      height: 35
    },
    leftIconButton: {
      width: 60,
      height: 60,
      position: 'absolute',
      top: '10',
      left: '5'
    },
    rightIconButton: {
      width: 60,
      height: 60,
      position: 'absolute',
      top: '10',
      right: '5'
    },
    cardTitle: {
      textAlign: 'center',
      padding: '30px',
      fontSize: '1.4rem',
      textTransform: 'uppercase',
      color: this.props.muiTheme.appBar.textColor,
      fontWeight: '900'
    },
    header: {
      fontSize: '1.4rem',
      marginBottom: 0,
      textTransform: 'uppercase',
      color: this.props.muiTheme.palette.primary1Color,
      fontWeight: '900',
      textAlign: 'center',
      paddingTop: 30
    }
  };

  state = {
    zDepth: 1,
    menuOpen: false
  };

  handleMouseEnter = () => {
    this.setState({
      zDepth: 3
    })
  };

  handleDelete = (event) => {
    event.stopPropagation()
    this.props.onDelete(this.props.listName)
  };
  handleRename = (event) => {
    event.stopPropagation()
    this.props.onRename(this.props.listName)
  };

  handleDownload = (event) => {
    event.stopPropagation()
    this.props.onDownload(this.props.listName)
  };

  handleMouseLeave = () => {
    this.setState({
      zDepth: 1
    })
  };

  handleOpenMenu = (event) => {
    event.stopPropagation()
    this.setState({ menuOpen: true, anchorEl: event.currentTarget })
  };

  handleCloseMenu = () => this.setState({ menuOpen: false });

  handleClick = (event) => {
    event.stopPropagation()
    const { onSelect, listName } = this.props
    onSelect(listName)
  };

  render() {
    const { muiTheme, listName, totalItems } = this.props
    const { anchorEl, menuOpen } = this.state
    return (
      <StyledList
        key={listName}
        className='image-element-class'
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <ListMenu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={this.handleCloseMenu}
          onDelete={this.handleDelete}
          onRename={this.handleRename}
          onDownload={this.handleDownload}
        />
        <StyledPaper zDepth={this.state.zDepth} onClick={this.handleClick}>
          <div style={{ position: 'relative' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100%'
              }}
            >
              <p style={this.styles.header}>
                {listName === DEFAULT_LIST ? (
                  <FormattedMessage {...messages.showLists} />
                ) : (
                  listName
                )}
              </p>
              {listName === DEFAULT_LIST ? (
                <ArrowBack
                  color={muiTheme.palette.primary1Color}
                  hoverColor={muiTheme.palette.accent1Color}
                  onClick={this.handleClick}
                  style={{ width: 100, height: 100 }}
                />
              ) : (
                <Badge
                  badgeContent={totalItems}
                  secondary={true}
                  badgeStyle={{ top: 23, right: 23 }}
                >
                  <Folder
                    color={muiTheme.palette.primary1Color}
                    hoverColor={muiTheme.palette.accent1Color}
                    onClick={this.handleClick}
                    style={{ width: 100, height: 100 }}
                  />
                </Badge>
              )}
            </div>
            {listName !== DEFAULT_LIST && (
              <CardActions>
                <IconButton
                  touch={true}
                  tooltip={<FormattedMessage {...messages.download} />}
                  iconStyle={this.styles.icon}
                  style={this.styles.leftIconButton}
                  onClick={this.handleDownload}
                >
                  <FileDownload
                    color={muiTheme.palette.primary1Color}
                    hoverColor={muiTheme.palette.accent1Color}
                  />
                </IconButton>
                <IconButton
                  touch={true}
                  tooltip={<FormattedMessage {...messages.manageList} />}
                  iconStyle={this.styles.icon}
                  style={this.styles.rightIconButton}
                  onClick={this.handleOpenMenu}
                >
                  <MoreVertIcon
                    color={muiTheme.palette.primary1Color}
                    hoverColor={muiTheme.palette.accent1Color}
                  />
                </IconButton>
              </CardActions>
            )}
          </div>
        </StyledPaper>
      </StyledList>
    )
  }
}

ListSnippet.propTypes = {
  listName: PropTypes.string.isRequired,
  muiTheme: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  totalItems: PropTypes.number
}

export default muiThemeable()(ListSnippet)
