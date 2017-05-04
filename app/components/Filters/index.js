  /**
*
* Filters
*
*/

import React, { PropTypes } from 'react'
import { SelectCatalog } from './SelectCatalog'
import { SelectLicense } from './SelectLicense'
import { SelectSize as Size } from './SelectSize'
import { SelectActivity as Activity } from './SelectActivity'
import { SelectArea as Area } from './SelectArea'
import { SelectLanguage as Language } from './SelectLanguage'

const Filters = ({ type }) => (
  <div>
    { types.reverse().map((type, i) =>
      const Filter = 
      <div>
        <Filter key={i} />
        <p>{Filter}</p>
      </div>
    )}
  </div>
)
Filters.propTypes = {
  type: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Filters
