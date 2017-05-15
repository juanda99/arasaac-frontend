import React, { PropTypes } from 'react'
import MaterialSnippet from 'components/MaterialSnippet'

const MaterialList = ({ materials, locale, viewMaterial }) => (
  <ul>
    { materials.map((material) =>
      <MaterialSnippet key={material.idMaterial} material={material} locale={locale} viewMaterial={viewMaterial} />
    )}
  </ul>
)

MaterialList.propTypes = {
  materials: PropTypes.arrayOf(PropTypes.object),
  locale: PropTypes.string.isRequired,
  viewMaterial: PropTypes.func.isRequired
}

export default MaterialList
