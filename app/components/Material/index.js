import React, { PropTypes } from 'react'
import H1Section from 'components/H1Section'

const Material = ({ material, locale }) => {
  console.log(material)

  return (
  // we should show current locale and show other language if required
    <li>
      <section>
        <p>{locale}</p>
        <H1Section>{material.title}</H1Section>
        <p>{material.desc}</p>
      </section>
    </li>
  )
}

// needed for tests: seee https://github.com/facebook/jest/issues/1824
Material.displayName = 'Material'

Material.propTypes = {
  // onClick: PropTypes.func.isRequired,
  material: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
}

export default Material
