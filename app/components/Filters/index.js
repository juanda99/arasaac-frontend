  /**
*
* Filters
*
*/

import React, { PropTypes } from 'react'
import { SelectCatalog as Catalog } from './SelectCatalog'
import { SelectLicense as License } from './SelectLicense'
import { SelectSize as Size } from './SelectSize'
import { SelectActivity as Activity } from './SelectActivity'
import { SelectArea as Area } from './SelectArea'
import { SelectLanguage as Language } from './SelectLanguage'

const Filters = ({ filters }) => (
  <div>
    { filters.reverse().map((Filter, i) =>
      <div>
        <Filter key={i} />
        <p>{Filter}</p>
      </div>
    )}
  </div>
)
Filters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Filters
