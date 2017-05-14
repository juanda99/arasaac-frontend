import React, { PropTypes } from 'react'
import Material from 'components/Material'

const MaterialList = ({ materials, locale }) => (
  <ul>
    { materials.map((material) =>
      <Material key={material.id} material={material} locale={locale} />
    )}
  </ul>
)

MaterialList.propTypes = {
  materials: PropTypes.arrayOf(PropTypes.object),
  locale: PropTypes.string.isRequired
}

export default MaterialList
