import React, { PropTypes } from 'react'

const Material = ({ material }) => (
  <li>
    <h4>{material.title}</h4>
    <p>{material.desc}</p>
  </li>
)

// needed for tests: seee https://github.com/facebook/jest/issues/1824
Material.displayName = 'Material'

Material.propTypes = {
  // onClick: PropTypes.func.isRequired,
  material: PropTypes.object.isRequired
}

export default Material
