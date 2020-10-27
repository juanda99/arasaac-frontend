import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { PlayButton, Timer, Progress } from 'react-soundplayer/components'
import muiThemeable from 'material-ui/styles/muiThemeable'
// it's just an alias for 'withSoundCloudAudio' but makes code clearer
import { withCustomAudio } from 'react-soundplayer/addons'

import {
  LOCUTIONS_URL,
} from 'services/config'

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

  readText = (streamUrl, text) => {
    if (!streamUrl) {
      if ('speechSynthesis' in window) {
        const toSpeak = new SpeechSynthesisUtterance(text)
        // toSpeak.lang = 'es_US'
        window.speechSynthesis.speak(toSpeak)
      }
    }
  }

  render() {
    const { playing, seeking, currentTime, duration, showProgress, showTimer, streamUrl, keyword } = this.props
    const { progressInner, progress, timer, button, container } = this.styles
    return (
      <div style={container}>
        <SoundButton onClick={() => this.readText(streamUrl, keyword)}>
          <PlayButton
            style={button}
            {...this.props}
            playing={playing}
            seeking={seeking}

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


export const  getSoundPlayer = (hasLocution, locale, keyword, download) => {
    // split('/').join("\\\\") for pictos like 1/3, rewrote to 1\\3 for file system restrictions
    const streamUrl = hasLocution ? `${LOCUTIONS_URL}/${locale}/${encodeURIComponent(keyword.toLowerCase().split('/').join('\\\\'))}.mp3` : null
    return (
      <div style={{ display: 'flex' }}>
      {!download && 
        <SoundPlayer
          crossOrigin='anonymous'
          streamUrl={streamUrl}
          keyword={keyword}
          preloadType='metadata'
          showProgress={false}
          showTimer={false}
        />
      }

        {download && hasLocution && (
          <IconButton
            touch={true}
            onClick={
              () =>this.props.onDownloadLocution(locale, keyword)
            }
          >
            <CloudDownloadIcon/>
          </IconButton>
        )}
      </div>
    )
  };

