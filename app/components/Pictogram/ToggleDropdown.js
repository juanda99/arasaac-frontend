import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import muiThemeable from 'material-ui/styles/muiThemeable'
import OptionsOff from 'material-ui/svg-icons/navigation/chevron-right'
import OptionsOn from 'material-ui/svg-icons/navigation/expand-more'
import IconButton from 'material-ui/IconButton'
import Toggle from 'material-ui/Toggle'
import messages from './messages'

class ToggleDropdown extends PureComponent {

  renderExtra = () => (
    this.props.showExtra ?
      <IconButton style={{ position: 'absolute', left: '200px' }}>
        <OptionsOn color={this.props.muiTheme.palette.primary1Color} />
      </IconButton>
    :
      <IconButton style={{ position: 'absolute', left: '200px' }}>
        <OptionsOff color={this.props.muiTheme.palette.primary1Color} />
      </IconButton>
  )

  render() {
    const { onToggle, toggled, style, label } = this.props
    return (
      <div style={{ position: 'relative', width: '200px', display: 'flex', textAlign: 'center' }} >
        <Toggle
          label={label}
          labelPosition='right'
          style={style}
          toggled={toggled}
          onToggle={onToggle}
        />
        { toggled ? this.renderExtra : '' }
      </div>
    )
  }
}

ToggleDropdown.propTypes = {
  muiTheme: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  toggled: PropTypes.bool.isRequired,
  showExtra: PropTypes.bool.isRequired,
  style: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
}

export default muiThemeable()(ToggleDropdown)
