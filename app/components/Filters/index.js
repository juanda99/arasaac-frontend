import React, { PropTypes } from 'react'
import { Map } from 'immutable'
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
      return <Filter key={item[0]} values={item[1]} setFilterItems={setFilterItems} />
    })
    }
  </div>
)

FilterList.propTypes = {
  filtersMap: PropTypes.instanceOf(Map).isRequired,
  setFilterItems: PropTypes.func.isRequired
}

export default FilterList
