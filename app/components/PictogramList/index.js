import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import withWidth, { SMALL, LARGE } from 'material-ui/utils/withWidth'
import PictogramSnippet from '../PictogramSnippet'

const Masonry = require('react-masonry-component')


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
      searchText,
      favorites,
      onDeleteFavorite,
      onAddFavorite,
      rtl,
      onDownload
    } = this.props
    const masonryOptions = {
      transitionDuration: '1s',
      isOriginLeft: !rtl
    }
    const renderPictograms = pictograms.map((pictogram) => {
      const isFavorite = favorites.includes(pictogram._id)
      return (
        <PictogramSnippet
          pictogram={pictogram}
          searchText={searchText}
          locale={locale}
          key={pictogram._id}
          showExtra={width === LARGE}
          onClickFavorite={isFavorite ? onDeleteFavorite : onAddFavorite}
          onDownload={onDownload}
          isFavorite={isFavorite}
        />
      )
    })

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
  filtersMap: ImmutablePropTypes.map.isRequired,
  setFilterItems: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  width: PropTypes.number.isRequired,
  onAddFavorite: PropTypes.func.isRequired,
  onDeleteFavorite: PropTypes.func.isRequired,
  favorites: ImmutablePropTypes.list,
  rtl: PropTypes.bool.isRequired,
  onDownload: PropTypes.func.isRequired,
}

export default withWidth()(PictogramList)
