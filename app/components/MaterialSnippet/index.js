import React, { PropTypes } from 'react'
import H1Section from 'components/H1Section'

const MaterialSnippet = ({ material, locale, viewMaterial }) => {
  const handleClick = () => {
    viewMaterial(material.idMaterial)
  }

  return (
    <li key={material.idMaterial}>
      <section>
        <p>{locale}</p>
        <H1Section onClick={handleClick}>{material.title}</H1Section>
        <p>{material.desc}</p>
      </section>
    </li>
  )
}

// needed for tests: seee https://github.com/facebook/jest/issues/1824
MaterialSnippet.displayName = 'MaterialSnippet'

MaterialSnippet.propTypes = {
  // onClick: PropTypes.func.isRequired,
  material: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  viewMaterial: PropTypes.func.isRequired
}

export default MaterialSnippet
