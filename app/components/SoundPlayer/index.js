import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { PlayButton, Timer, Progress } from 'react-soundplayer/components'
import muiThemeable from 'material-ui/styles/muiThemeable'
// it's just an alias for 'withSoundCloudAudio' but makes code clearer
import { withCustomAudio } from 'react-soundplayer/addons'

import SoundButton from './SoundButton'
import './icons.css'

class SoundPlayer extends PureComponent {

  styles = {
    progressInner: {
      backgroundColor: this.props.muiTheme.palette.primary1Color,
      height: '100%',
      transition: 'width .2s ease-in'
    },
    progress: {
      height: '3px',
      backgroundColor: this.props.muiTheme.palette.accent2Color
    },
    timer: {
      color: this.props.muiTheme.palette.primary1Color
    },
    button: {
      outline: 'none'
    },
    container: {
      width: this.props.showProgress ? '300px' : 'auto'
    }
  }

  render() {
    const { playing, seeking, currentTime, duration, showProgress, showTimer } = this.props
    const { progressInner, progress, timer, button, container } = this.styles
    return (
      <div style={container}>
        <SoundButton>
          <PlayButton
            style={button}
            {...this.props}
            playing={playing}
            seeking={seeking}
          //  onTogglePlay={this.handleClick}
          />

        </SoundButton>
        {showTimer ? <Timer {...this.props} style={timer} /> : ''}
        {showProgress ?
          <Progress
            value={(currentTime / duration) * 100 || 0}
            style={progress}
            innerStyle={progressInner}
            {...this.props}
            color='blue'
          />
          : ''
        }
      </div>
    )
  }
}

export default muiThemeable()(withCustomAudio(SoundPlayer))

SoundPlayer.propTypes = {
  playing: PropTypes.bool.isRequired,
  seeking: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  muiTheme: PropTypes.object.isRequired,
  showProgress: PropTypes.bool,
  showTimer: PropTypes.bool
}
