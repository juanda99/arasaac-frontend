import React, { PureComponent, PropTypes } from 'react'
// import { FormattedMessage } from 'react-intl'
import MaterialSnippet from 'components/MaterialSnippet'
import { Map } from 'immutable'
import Pagination from 'material-ui-pagination'
// import messages from './messages'

const itemsPerPage = 10 /* number of items per page */
const display = 10 /* number of pages to see in the paginator */

export class MaterialList extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.materials !== this.props.materials) {
      // reset pagination, as data has changed:
      this.setState({ currentPage: 1 })
    }
  }

  handlePageClick = (currentPage) => {
    this.setState({ currentPage })
  }

  render() {
    const { locale, viewMaterial, materials, filtersMap, setFilterItems, filtersData } = this.props
    const { currentPage } = this.state
    const total = Math.ceil(materials.length / itemsPerPage)
    const offset = Math.ceil((currentPage - 1) * itemsPerPage)
    const visibleMaterials = this.props.materials.slice(offset, offset + itemsPerPage)
    return (
      <div>
        <p> Se han encontrado {materials.length} materiales </p>
        <ul>
          { visibleMaterials.map((material) =>
            <MaterialSnippet
              key={material.idMaterial}
              material={material}
              locale={locale}
              viewMaterial={viewMaterial}
              filtersMap={filtersMap}
              setFilterItems={setFilterItems}
              filtersData={filtersData}
            />
          )}
        </ul>
        <Pagination
          total={total}
          current={currentPage}
          display={display}
          onChange={this.handlePageClick}
        />
      </div>
    )
  }
}

MaterialList.propTypes = {
  materials: PropTypes.arrayOf(PropTypes.object),
  // with optional parameters in the router is slower in my tests ????
  // rollback from https://github.com/react-boilerplate/react-boilerplate/issues/1748
  locale: PropTypes.string,
  viewMaterial: PropTypes.func,
  filtersMap: PropTypes.instanceOf(Map).isRequired,
  setFilterItems: PropTypes.func.isRequired,
  filtersData: PropTypes.instanceOf(Map).isRequired
}

export default MaterialList
