import React, { PureComponent, PropTypes } from 'react'
import MaterialSnippet from 'components/MaterialSnippet'


export class MaterialList extends PureComponent {

  render() {
    const { materials, locale, viewMaterial } = this.props
    return (
      <ul>
        { materials.map((material) =>
          <MaterialSnippet key={material.idMaterial} material={material} locale={locale} viewMaterial={viewMaterial} />
        )}
      </ul>
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
