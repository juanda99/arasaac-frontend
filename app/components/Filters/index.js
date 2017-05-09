import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import Catalog from './Catalog'
import License from './License'
import Size from './Size'
import Activity from './Activity'
import Area from './Area'
import Language from './Language'

const filters = { Catalog, License, Language, Size, Activity, Area }

const FilterList = ({ filtersMap, addFilterItem, removeFilterItem }) => (
  <div>
    { filtersMap.entrySeq().map((item) => {
      const Filter = filters[item[0]]
      const values = item[1].toJSON() // convert Immutable.Set to Array
      return <Filter key={item[0]} values={values} addFilterItem={addFilterItem} removeFilterItem={removeFilterItem} />
    })
    }
  </div>
)

FilterList.propTypes = {
  filtersMap: PropTypes.instanceOf(Map).isRequired,
  addFilterItem: PropTypes.func.isRequired,
  removeFilterItem: PropTypes.func.isRequired
}

/*
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
*/

export default FilterList
