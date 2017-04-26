import React from 'react'
import IconButton from 'material-ui/IconButton'
import Filter from './images/Filter'

const FilterIcon = () => (
  <IconButton style={{ position: 'absolute', Top: '50px' }} touch={false} >
    <Filter />
  </IconButton>
)

export default FilterIcon
