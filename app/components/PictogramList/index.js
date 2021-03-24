import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import withWidth, { SMALL, LARGE } from 'material-ui/utils/withWidth'
import Pagination from 'material-ui-pagination'
import PictogramSnippet from '../PictogramSnippet'

const Masonry = require('react-masonry-component')

const styles = {
  masonry: {
    listStyleType: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 2,
    justifyContent: 'space-around',
  },
}

const itemsPerPage = 20 /* number of items per page */
const display = 7 /* number of pages to see in the paginator */

export class PictogramList extends PureComponent {
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
      pictograms,
      width,
      searchText,
      favorites,
      onDeleteFavorite,
      onAddFavorite,
      rtl,
      onDownload,
      offset,
      sex,
      violence,
      color,
    } = this.props

    const numberItems = pictograms.length
    const totalPages = Math.ceil(numberItems / itemsPerPage)
    const visiblePictograms = pictograms.slice(offset, offset + itemsPerPage)
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

    const masonryOptions = {
      transitionDuration: '1s',
      isOriginLeft: !rtl,
    }
    const renderPictograms = visiblePictograms.map((pictogram) => {
      const isFavorite = favorites.includes(pictogram._id.toString())
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
          sex={sex}
          violence={violence}
          color={color}
        />
      )
    })

    return (
      <div>
        {width !== SMALL ? (
          <div ref={this.setTopRef}>
            {pagination}
            <Masonry
              className={'my-gallery-class'} // default ''
              elementType={'ul'} // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              style={styles.masonry}
            >
              {renderPictograms}
            </Masonry>
            {pagination}
          </div>
        ) : (
          <div ref={this.setTopRef}>
            {pagination}
            <ul>{renderPictograms}</ul>
          </div>
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
  searchText: PropTypes.string,
  width: PropTypes.number.isRequired,
  onAddFavorite: PropTypes.func.isRequired,
  onDeleteFavorite: PropTypes.func.isRequired,
  favorites: ImmutablePropTypes.list,
  rtl: PropTypes.bool.isRequired,
  onDownload: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired,
  sex: PropTypes.bool.isRequired,
  violence: PropTypes.bool.isRequired,
  color: PropTypes.bool.isRequired,
}

export default withWidth()(PictogramList)
