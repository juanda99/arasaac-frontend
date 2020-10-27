import React from 'react'
import SoundPlayer from './index';
import CloudDownloadIcon from 'material-ui/svg-icons/action/get-app'
import IconButton from 'material-ui/IconButton'
import {
  LOCUTIONS_URL,
} from 'services/config'
import {downloadLocution } from 'services'

const ShowSoundPlayer = ({hasLocution, locale, keyword, download, onDownloadLocution}) => {

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
              ()=> (window.location = downloadLocution(locale, keyword))
            }
          >
            <CloudDownloadIcon />
          </IconButton>
        )}
      </div>
    )
}
    

export default ShowSoundPlayer
