/*
 *
 * MaterialsView
 *
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { white } from 'material-ui/styles/colors'
import ClassIcon from 'material-ui/svg-icons/action/class'
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
    const { onFilterClick, filterActive, onSettingsClick, settingsActive, onLabelsClick, labelsActive, muiTheme } = this.props

    return (
      <div>
        <IconButton style={styles.icon} onClick={onLabelsClick} tooltip={<FormattedMessage {...messages.showCategories} />}>
          { labelsActive ?
            <ClassIcon color={muiTheme.palette.accent1Color} hoverColor={muiTheme.palette.primary1Color} />
            : <ClassIcon color={muiTheme.palette.accent2Color} hoverColor={muiTheme.palette.primary1Color} /> }
        </IconButton>
        <IconButton style={styles.icon} onClick={onFilterClick} tooltip={<FormattedMessage {...messages.showFilters} />}>
          { filterActive ?
            <FilterListIcon color={muiTheme.palette.accent1Color} hoverColor={muiTheme.palette.primary1Color} />
            : <FilterListIcon color={muiTheme.palette.accent2Color} hoverColor={muiTheme.palette.primary1Color} /> }
        </IconButton>
        <IconButton style={styles.icon} onClick={onSettingsClick} tooltip={<FormattedMessage {...messages.showSettings} />} >
          { settingsActive ?
            <SettingsIcon color={muiTheme.palette.accent1Color} hoverColor={muiTheme.palette.primary1Color} />
            : <SettingsIcon color={muiTheme.palette.accent2Color} hoverColor={muiTheme.palette.primary1Color} /> }
        </IconButton>
      </div>
    )
  }
}

ActionButtons.propTypes = {
  onFilterClick: PropTypes.func.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
  onLabelsClick: PropTypes.func.isRequired,
  filterActive: PropTypes.bool.isRequired,
  labelsActive: PropTypes.bool.isRequired,
  settingsActive: PropTypes.bool.isRequired,
  muiTheme: PropTypes.object
}

export default muiThemeable()(ActionButtons)
