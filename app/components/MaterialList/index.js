import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import MaterialSnippet from 'components/MaterialSnippet'
import { Map } from 'immutable'
import Pagination from 'material-ui-pagination'

const itemsPerPage = 10 /* number of items per page */
const display = 7 /* number of pages to see in the paginator */

export class MaterialList extends PureComponent {
  componentWillReceiveProps(nextProps) {
    if (nextProps.materials !== this.props.materials) {
      // reset pagination, as data has changed:
      this.setState({ currentPage: 1 })
    }
  }

  setTopRef = (element) => {
    this.topPosition = element
  }

  // handlePageClick = (currentPage) => {
  //   this.setState({ currentPage })
  //   this.topPosition.scrollIntoView()
  //   // window.scroll(0, 0)
  // }

  handleClick = (currentPage) => {
    const offset = (currentPage - 1) * itemsPerPage
    this.props.onPageClick(offset)
  }

  render() {
    const {
      locale,
      materials,
      filtersMap,
      onFilterChange,
      offset,
      showLabels,
      showActionButtons,
      publishMaterial,
      removeMaterial,
    } = this.props

    //   : null
    const numberItems = materials.length
    const totalPages = Math.ceil(numberItems / itemsPerPage)
    const visibleMaterials = materials.slice(offset, offset + itemsPerPage)
    const currentPage = Math.ceil(offset / itemsPerPage) + 1
    const pagination =
      numberItems > itemsPerPage ? (
        <Pagination
          // limit={itemsPerPage}
          display={display}
          // offset={offset}
          current={currentPage}
          total={totalPages}
          // onClick={(e, offsetParam) => this.handleClick(offsetParam)}
          onChange={this.handleClick}
          currentPageColor="inherit"
          styleRoot={{ textAlign: 'center' }}
        />
      ) : null
    return (
      <div ref={this.setTopRef}>
        {pagination}
        <ul>
          {visibleMaterials.map((material) => (
            <MaterialSnippet
              key={material.idMaterial}
              material={material}
              locale={locale}
              filtersMap={filtersMap}
              onFilterChange={onFilterChange}
              showLabels={showLabels}
              showActionButtons={showActionButtons}
              publishMaterial={publishMaterial}
              removeMaterial={removeMaterial}
            />
          ))}
        </ul>
        {pagination}
      </div>
    )
  }
}

MaterialList.propTypes = {
  materials: PropTypes.arrayOf(PropTypes.object),
  // with optional parameters in the router is slower in my tests ????
  // rollback from https://github.com/react-boilerplate/react-boilerplate/issues/1748
  locale: PropTypes.string,
  showLabels: PropTypes.bool.isRequired,
  filtersMap: PropTypes.instanceOf(Map).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired,
  showActionButtons: PropTypes.bool.isRequired,
  publishMaterial: PropTypes.func.isRequired,
  removeMaterial: PropTypes.func.isRequired,
}

export default MaterialList
