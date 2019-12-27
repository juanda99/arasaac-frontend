import React from 'react'
import PropTypes from 'prop-types'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Delete from 'material-ui/svg-icons/action/delete'
import Download from 'material-ui/svg-icons/file/file-download'
import Edit from 'material-ui/svg-icons/image/edit'
import Divider from 'material-ui/Divider'
const ListMenu = ({
  anchorEl,
  open,
  onClose,
  onDelete,
  onRename,
  onDownload
}) => (
  <Popover
    open={open}
    anchorEl={anchorEl}
    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
    onRequestClose={onClose}
    onContextMenu={(e) => e.preventDefault()}
  >
    <Menu>
      <MenuItem primaryText='Rename' leftIcon={<Edit />} onClick={onRename} />
      <MenuItem
        primaryText='Download'
        leftIcon={<Download />}
        onClick={onDownload}
      />
      <Divider />
      <MenuItem primaryText='Delete' leftIcon={<Delete />} onClick={onDelete} />
    </Menu>
  </Popover>
)

ListMenu.propTypes = {
  anchorEl: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired
}

export default ListMenu
