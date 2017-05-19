import React, { PropTypes } from 'react'
import H1Section from 'components/H1Section'
import ShareBar from 'components/ShareBar'

const Material = ({ material, locale }) => (
  // we should show current locale and show other language if required
  <div>
    <H1Section>{material.title}</H1Section>
    <p>{material.desc}</p>
    <p>{locale}</p>
    <ShareBar shareUrl={window.location.href} title={material.title} image={material.images[0]} />
  </div>
)

// needed for tests: seee https://github.com/facebook/jest/issues/1824
Material.displayName = 'Material'

Material.propTypes = {
  // onClick: PropTypes.func.isRequired,
  material: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
}

export default Material
