import React from 'react'
import PropTypes from 'prop-types'
import { Map, List } from 'immutable'
import FilterSelectLoader from './FilterSelectLoader'

const FilterList = ({ filtersMap, setFilterItems, filtersData }) => (
  <div style={{ marginBottom: '3rem' }}>
    { filtersMap.entrySeq().map((item) => {
      // const Filter = filters[item[0]]
      const values = List.isList(item[1]) ? item[1].toArray() : item[1]
      return <FilterSelectLoader key={item[0]} type={item[0]} values={values} setFilterItems={setFilterItems} filterData={filtersData.get(item[0])} />
    })
    }
  </div>
)

FilterList.displayName = 'FilterList'

FilterList.propTypes = {
  filtersMap: PropTypes.instanceOf(Map).isRequired,
  filtersData: PropTypes.instanceOf(Map).isRequired,
  setFilterItems: PropTypes.func.isRequired
}

export default FilterList
