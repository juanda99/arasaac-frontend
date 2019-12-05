import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import withWidth, { SMALL, LARGE } from 'material-ui/utils/withWidth'
import { DEFAULT_LIST } from 'utils'
import ListSnippet from './ListSnippet'
import PictogramSnippet from 'components/PictogramSnippet'

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

export class FavoriteList extends PureComponent {
  render() {
    const {
      items,
      width,
      selectedList,
      onDownloadList,
      onDeleteList,
      onSelectList,
      listPictograms
    } = this.props
    const [...lists] = items.keys()
    let renderLists
    if (selectedList === DEFAULT_LIST) {
      renderLists = lists
        .filter((listItem) => listItem !== DEFAULT_LIST)
        .map((listItem) => {
          const totalItems = items.get(selectedList).size
          return (
            <ListSnippet
              key={listItem}
              listName={listItem}
              totalItems={totalItems}
              onDelete={onDeleteList}
              onDownload={onDownloadList}
              onSelect={onSelectList}
            />
          )
        })
    } else {
      /* in these case we just render back button */
      renderLists = (
        <ListSnippet
          key={DEFAULT_LIST}
          listName={DEFAULT_LIST}
          onDelete={onDeleteList}
          onDownload={onDownloadList}
          onSelect={onSelectList}
        />
      )
    }

    const renderPictograms = listPictograms.map((pictogram) => (
      <PictogramSnippet
        pictogram={pictogram}
        locale={'es'}
        key={pictogram._id}
        showExtra={width === LARGE}
        onAddFavorite={() => {
          console.log('kkkkk')
        }}
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
            {renderLists}
            {renderPictograms}
          </Masonry>
        ) : (
          <ul>
            {renderLists}
            {renderPictograms}
          </ul>
        )}
      </div>
    )
  }
}

FavoriteList.propTypes = {
  items: PropTypes.object,
  width: PropTypes.number.isRequired,
  listPictograms: PropTypes.arrayOf(PropTypes.object),
  onSelectList: PropTypes.func.isRequired,
  onDeleteList: PropTypes.func.isRequired,
  onDownloadList: PropTypes.func.isRequired,
  selectedList: PropTypes.string.isRequired
}

export default withWidth()(FavoriteList)
