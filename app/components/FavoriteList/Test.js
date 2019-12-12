import React from 'react'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
}

const Test = () => (
  <div style={layerStyles} id='kkkk2kk'>
    {console.log('rendered *********************************************')}
    <p>Prueba</p>
  </div>
)

export default Test
