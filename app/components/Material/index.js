import React, { PropTypes } from 'react'

const Material = (props) => (
  <li>
    <h4> {props.material.title}</h4>
    <p>{props.material.desc}</p>
  </li>
)

Material.propTypes = {
  // onClick: PropTypes.func.isRequired,
  material: PropTypes.object.isRequired
}

export default Material
