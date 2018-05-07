import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import muiThemeable from 'material-ui/styles/muiThemeable'
import IconButton from 'material-ui/IconButton';
import Play from 'material-ui/svg-icons/AV/play-circle-outline'
import Pause from 'material-ui/svg-icons/AV/pause-circle-outline'

styles = {
  smallIcon: {
    width: 36,
    height: 36
  },
  small: {
    width: 72,
    height: 72,
    padding: 16
  }
}

class SoundPlayer extends PureComponent {

  state = {
    play: false
  

  render() {
    const { play } = this.state
    const { muiTheme } = this.props
    const button = play ? (
      <IconButton iconStyle={styles.smallIcon} style={styles.small}>
        <Pause color={muiTheme.palette.primary1Color} hoverColor={muiTheme.palette.primary1Color} />
      </IconButton>
    ) : (
      <IconButton iconStyle={styles.smallIcon} style={styles.small}>
      <Play color={muiTheme.palette.primary1Color} hoverColor={muiTheme.palette.primary1Color} />
    </IconButton>
    );
    return (
      { button }
    )
  }
}

SoundPlayer.propTypes = {
  requestPictogram: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  pictogramData: PropTypes.object,
  loading: PropTypes.bool
}

export default muiThemeable()(SoundPlayer)
