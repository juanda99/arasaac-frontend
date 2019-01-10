/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layer, Rect } from 'react-konva'
import { CANVAS_SIZE } from './constants'

export default class BackgroundLayer extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired
  }

  state = {
    color: 'black'
  }

  render() {
    console.log('se renderiza de nuevo la capa de fondo')
    const { color } = this.props
    return (
      <Layer>
        <Rect fill={color} width={CANVAS_SIZE} height={CANVAS_SIZE} />
      </Layer>
    )
  }
}
