import React, { PropTypes } from 'react'
import H1Section from 'components/H1Section'

const Material = ({ material }) => (
  <li>
    <section>
      <H1Section>{material.title}</H1Section>
      <p>{material.desc}</p>
    </section>
  </li>
)

// needed for tests: seee https://github.com/facebook/jest/issues/1824
Material.displayName = 'Material'

Material.propTypes = {
  // onClick: PropTypes.func.isRequired,
  material: PropTypes.object.isRequired
}

export default Material
