import React from 'react'
import PropTypes from 'prop-types'
import Visibility from 'material-ui/svg-icons/action/visibility'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import Share from 'material-ui/svg-icons/social/share'
import { green500 as iconColor } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import SelectButton from './SelectButton'

const styles = {
  icon: {
    marginRight: 0
  }
}

const PictogramMenu = ({ style }) => (
  <div style={style}>
    <IconButton style={styles.icon} tooltip='Ver más'>
      <Visibility color={iconColor} />
    </IconButton>
    <SelectButton style={styles.icon} color={iconColor} />
    <IconButton style={styles.icon}>
      <FileDownload color={iconColor} />
    </IconButton>
    <IconButton style={styles.icon}>
      <Share color={iconColor} />
    </IconButton>
  </div>
)

PictogramMenu.propTypes = {
  style: PropTypes.object.isRequired
}

export default PictogramMenu
