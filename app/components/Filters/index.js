import React from 'react'
import PropTypes from 'prop-types'
import { Map, List } from 'immutable'
import FilterSelectLoader from './FilterSelectLoader'

const FilterList = ({ filtersMap, filtersData, ...other }) => (
  <div id="filtersArea">
    {filtersMap.entrySeq().map((item) => {
      const values = List.isList(item[1]) ? item[1].toArray() : item[1]
      return (
        <FilterSelectLoader
          {...other}
          key={item[0]}
          type={item[0]}
          values={values}
          filtersData={filtersData[item[0]]}
        />
      )
    })}
  </div>
)

FilterList.displayName = 'FilterList'

FilterList.propTypes = {
  filtersMap: PropTypes.instanceOf(Map).isRequired,
  filtersData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default FilterList
