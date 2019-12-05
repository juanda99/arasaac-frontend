import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import withWidth, { SMALL, LARGE } from 'material-ui/utils/withWidth'
import PictogramSnippet from '../PictogramSnippet'

const Masonry = require('react-masonry-component')
const masonryOptions = {
  transitionDuration: '1s'
}

const styles = {
  masonry: {
    listStyleType: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 2,
    justifyContent: 'space-around'
  }
}

export class PictogramList extends PureComponent {
  render() {
    const {
      locale,
      pictograms,
      filtersMap,
      setFilterItems,
      width,
      searchText
    } = this.props
    const renderPictograms = pictograms.map((pictogram) => (
      <PictogramSnippet
        pictogram={pictogram}
        searchText={searchText}
        locale={locale}
        key={pictogram._id}
        showExtra={width === LARGE}
        onAddFavorite={this.props.onAddFavorite}
      />
    ))

    return (
      <div>
        {width !== SMALL ? (
          <Masonry
            className={'my-gallery-class'} // default ''
            elementType={'ul'} // default 'div'
            options={masonryOptions} // default {}
            disableImagesLoaded={false} // default false
            style={styles.masonry}
          >
            {renderPictograms}
          </Masonry>
        ) : (
          <ul>{renderPictograms}</ul>
        )}
      </div>
    )
  }
}

PictogramList.propTypes = {
  pictograms: PropTypes.arrayOf(PropTypes.object).isRequired,
  // with optional parameters in the router is slower in my tests ????
  // rollback from https://github.com/react-boilerplate/react-boilerplate/issues/1748
  locale: PropTypes.string,
  filtersMap: PropTypes.instanceOf(Map).isRequired,
  setFilterItems: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  width: PropTypes.number.isRequired,
  onAddFavorite: PropTypes.func.isRequired
}

export default withWidth()(PictogramList)
