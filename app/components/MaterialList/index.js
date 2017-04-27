import React, { PropTypes } from 'react'
import Material from 'components/Material'

const MaterialList = ({ materials }) => (
  <ul>
    { materials.map((material) =>
      <Material key={material.id} material={material} />
    )}
  </ul>
)

MaterialList.propTypes = {
  materials: PropTypes.arrayOf(PropTypes.object)
}

export default MaterialList
