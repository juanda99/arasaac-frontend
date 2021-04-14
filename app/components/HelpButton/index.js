/*
 *
 * MaterialsView
 *
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import HelpIcon from 'material-ui/svg-icons/action/help'
import IconButton from 'material-ui/IconButton'
import muiThemeable from 'material-ui/styles/muiThemeable'
import messages from './messages'

const styles = {
  icon: {
    width: 'auto',
  },
}

class HelpButton extends PureComponent {
  render() {
    const { muiTheme, helpActive, onHelpClick, showHelp } = this.props

    return (
      <div>
        {showHelp && (
          <IconButton
            style={styles.icon}
            onClick={onHelpClick}
            tooltip={<FormattedMessage {...messages.showHelp} />}
          >
            {helpActive ? (
              <HelpIcon
                color={muiTheme.palette.accent1Color}
                hoverColor={muiTheme.palette.primary2Color}
              />
            ) : (
              <HelpIcon
                color={muiTheme.palette.accent3Color}
                hoverColor={muiTheme.palette.primary2Color}
              />
            )}
          </IconButton>
        )}
      </div>
    )
  }
}

HelpButton.propTypes = {
  muiTheme: PropTypes.object,
  helpActive: PropTypes.bool,
  onHelpClick: PropTypes.func,
  showHelp: PropTypes.bool,
}

HelpButton.defaultProps = {
  showHelp: true,
}

export default muiThemeable()(HelpButton)
