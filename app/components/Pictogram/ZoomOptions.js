/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Slider from 'material-ui/Slider'
import ToggleDropDown from './ToggleDropdown'
import messages from './messages'
import styles from './styles'

class ZoomOptions extends Component {
  static propTypes = {
    onActive: PropTypes.func.isRequired,
    zoomLevel: PropTypes.number.isRequired,
    onZoomChange: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    showOptions: PropTypes.bool.isRequired,
    onOptionsShow: PropTypes.func.isRequired
  }

  handleZoomChange = (event, value) => {
    this.props.onZoomChange(value)
  }

  handleActive = (active) => this.props.onActive(active)

  handleOptionsShow = () => this.props.onOptionsShow(!this.props.showOptions)

  render() {
    const { zoomLevel, showOptions, active } = this.props
    const marginBottom = showOptions ? '150px' : 'auto'
    return (
      <div style={{ marginBottom }}>
        <ToggleDropDown
          toggled={active}
          onToggle={this.handleActive}
          label={<FormattedMessage {...messages.zoomLevel} />}
          style={styles.toggle}
          showOptions={showOptions}
          onClick={this.handleOptionsShow}
        />
        {showOptions ? (
          <div style={styles.optionBox}>
            <Slider
              min={-400}
              max={+800}
              step={1}
              value={zoomLevel}
              onChange={this.handleZoomChange}
              style={{ width: '200px' }}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default ZoomOptions
