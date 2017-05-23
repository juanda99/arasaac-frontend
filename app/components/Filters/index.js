import React, { PropTypes } from 'react'
import { Map, List } from 'immutable'
import Catalog from './Catalog'
import License from './License'
import Size from './Size'
import Activity from './Activity'
import Area from './Area'
import Language from './Language'

const filters = { Catalog, License, Language, Size, Activity, Area }

const FilterList = ({ filtersMap, setFilterItems }) => (
  <div style={{ marginBottom: '3rem' }}>
    { filtersMap.entrySeq().map((item) => {
      const Filter = filters[item[0]]
      const values = List.isList(item[1]) ? item[1].toArray() : item[1]
      return <Filter key={item[0]} values={values} setFilterItems={setFilterItems} />
    })
    }
  </div>
)

FilterList.displayName = 'FilterList'

FilterList.propTypes = {
  filtersMap: PropTypes.instanceOf(Map).isRequired,
  setFilterItems: PropTypes.func.isRequired
}

export default FilterList
