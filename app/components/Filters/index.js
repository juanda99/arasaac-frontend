import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import Catalog from './Catalog'
import License from './License'
import Size from './Size'
import Activity from './Activity'
import Area from './Area'
import Language from './Language'

const filters = { Catalog, License, Language, Size, Activity, Area }

const FilterList = ({ filtersMap }) => (
  <div>
    { filtersMap.entrySeq().map((item) => {
      const Filter = filters[item[0]]
      console.log('item0: ' + item[0])
      console.log('item1:' + item[1])
      // return <p key={type}></p>
      // return <p>Ha entrado por aquí</p>
      return <Filter values={item[1]} />
    })
    }
  </div>
)

FilterList.propTypes = {
  filtersMap: PropTypes.instanceOf(Map)
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
