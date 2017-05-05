import React, { PropTypes } from 'react'
import Catalog from './Catalog'
import License from './License'
import Size from './Size'
import Activity from './Activity'
import Area from './Area'
import Language from './Language'


const filters = { Catalog, License, Language, Size, Activity, Area }

const FilterList = ({ types }) => (
  <div>
    { types.reverse().map((type) => {
      const Filter = filters[type]
      return <Filter key={type} />
    })}
  </div>
)

FilterList.propTypes = {
  types: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default FilterList
