import React, { PureComponent } from 'react'

export default class Prueba extends PureComponent {
  componentDidMount() {
    console.log('prueba mounted')
  }

  render() {
    console.log('prueba rendered')
    console.log(this.props)
    return (
      <div>prueba***************************</div>
    )
  }
}
