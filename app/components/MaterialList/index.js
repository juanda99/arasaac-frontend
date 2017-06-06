import React, { PureComponent, PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import MaterialSnippet from 'components/MaterialSnippet'
import Pagination from 'material-ui-pagination'
import messages from './messages'

const itemsPerPage = 10

export class MaterialList extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      total: Math.ceil(this.props.materials.length / itemsPerPage),
      display: 10,
      currentPage: 1,
      visibleMaterials: []
    }
  }

  componentWillMount() {
    this.loadData()
  }

  loadData = () => {
    const { currentPage } = this.state
    const offset = Math.ceil((currentPage - 1) * itemsPerPage)
    const visibleMaterials = this.props.materials.slice(offset, offset + itemsPerPage)
    this.setState({ visibleMaterials })
  }

  handlePageClick = (currentPage) => {
    this.setState({ currentPage }, () => {
      this.loadData()
    })
  }

  render() {
    const { locale, viewMaterial, materials } = this.props
    const { visibleMaterials, total, currentPage, display } = this.state
    return (
      <div>
        <p> Se han encontrado {materials.length} materiales </p>
        <ul>
          { visibleMaterials.map((material) =>
            <MaterialSnippet key={material.idMaterial} material={material} locale={locale} viewMaterial={viewMaterial} />
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
  viewMaterial: PropTypes.func
}

export default MaterialList
