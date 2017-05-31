import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'

const MaterialSnippet = ({ material, locale, viewMaterial }) => {
  const handleClick = () => {
    viewMaterial(material.idMaterial)
  }
  /* How we show messages...*/
  /* catalan: ca, va, es, en, ...*/
  /* br: pt, br, en, ....*/
  /* eu: eu, es, en, ....*/
  /* ga: ga, es, en, .....*/

  return (
    <li>
      <section>
        <p>{locale}</p>
        <FlatButton label={material.title} primary={true} onClick={handleClick} />
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
