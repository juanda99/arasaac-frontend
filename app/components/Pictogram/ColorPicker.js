/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CirclePicker, ChromePicker } from 'react-color'
import RaisedButton from 'material-ui/RaisedButton'

class ColorPicker extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChooseColor: PropTypes.func.isRequired,
    onShowMoreColors: PropTypes.func.isRequired,
    showMoreColors: PropTypes.bool.isRequired
  }

  handleColorChange = ({ hex }) => this.props.onChooseColor(hex)

  handleClick = () => this.props.onShowMoreColors()

  render() {
    const { color, colors, showMoreColors } = this.props
    return (
      <div>
        {showMoreColors ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ChromePicker
                color={color}
                onChangeComplete={this.handleColorChange}
              />
            </div>
            <RaisedButton
              label='Show less colors'
              primary={true}
              onClick={this.handleClick}
              style={{ marginTop: '20', width: '100%' }}
            />
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CirclePicker
                color={color}
                colors={colors}
                onChangeComplete={this.handleColorChange}
              />
            </div>
            <RaisedButton
              label='Show more colors'
              primary={true}
              onClick={this.handleClick}
              style={{ marginTop: '20', width: '100%' }}
            />
          </div>
        )}
      </div>
    )
  }
}

export default ColorPicker
