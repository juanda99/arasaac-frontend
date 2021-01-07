/*
 *
 * MaterialsView
 *
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import HelpIcon from 'material-ui/svg-icons/action/help'
import FilterListIcon from 'material-ui/svg-icons/content/filter-list'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import IconButton from 'material-ui/IconButton'
import muiThemeable from 'material-ui/styles/muiThemeable'
import messages from './messages'


const styles = {
  icon: {
    width: 'auto'
  }
}

class ActionButtons extends PureComponent {

  render() {
    const { 
      onFilterClick,
      filterActive,
      onSettingsClick,
      settingsActive,
      muiTheme,
      helpActive,
      onHelpClick,
      showFilters,
      showSettings,
      showHelp
    } = this.props

    return (
      <div>
        {showFilters && (
          <IconButton id='filtersBtn' style={styles.icon} onClick={onFilterClick} tooltip={<FormattedMessage {...messages.showFilters} />}>
            {filterActive ?
              <FilterListIcon color={muiTheme.palette.accent1Color} hoverColor={muiTheme.palette.primary2Color} />
              : <FilterListIcon color={muiTheme.palette.accent3Color} hoverColor={muiTheme.palette.primary2Color} />}
          </IconButton>
        )}
        {showSettings && (
          <IconButton id='advSearchBtn' style={styles.icon} onClick={onSettingsClick} tooltip={<FormattedMessage {...messages.advancedSearch} />}>
            {settingsActive ?
              <SettingsIcon color={muiTheme.palette.accent1Color} hoverColor={muiTheme.palette.primary2Color} />
              : <SettingsIcon color={muiTheme.palette.accent3Color} hoverColor={muiTheme.palette.primary2Color} />}
          </IconButton>
        )}
        {showHelp  && (
          <IconButton style={styles.icon} onClick={onHelpClick} tooltip={<FormattedMessage {...messages.showHelp} />}>
            {helpActive ?
              <HelpIcon color={muiTheme.palette.accent1Color} hoverColor={muiTheme.palette.primary2Color} />
              : <HelpIcon color={muiTheme.palette.accent3Color} hoverColor={muiTheme.palette.primary2Color} />}
          </IconButton>
        )}
      </div>
    )
  }
}

ActionButtons.propTypes = {
  onFilterClick: PropTypes.func,
  onSettingsClick: PropTypes.func,
  filterActive: PropTypes.bool,
  settingsActive: PropTypes.bool,
  muiTheme: PropTypes.object,
  helpActive: PropTypes.bool,
  onHelpClick: PropTypes.func,
  showHelp: PropTypes.bool,
  showFilters: PropTypes.bool,
  showSetting: PropTypes.bool,
}

ActionButtons.defaultProps = {
  showHelp:  true,
  showFilters: true,
  showSettings:  true
}

export default muiThemeable()(ActionButtons)
