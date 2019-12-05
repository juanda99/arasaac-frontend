import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import withWidth, { SMALL, LARGE } from 'material-ui/utils/withWidth'
import { DEFAULT_LIST } from 'utils'
import ListSnippet from './ListSnippet'

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
  state = {
    selectedList: DEFAULT_LIST
  };

  handleDeleteList = (listName) => {
    console.log(`This should delete the list: ${listName}`)
  };

  handleSelectList = (listName) => {
    this.setState({ selectedList: listName })
  };
  render() {
    const { items, width } = this.props
    const { selectedList } = this.state
    const pictos = items.get(selectedList)
    console.log(pictos, '^^^^^^^^^^^')
    const [...lists] = items.keys()
    let renderLists
    if (selectedList === DEFAULT_LIST) {
      renderLists = lists
        .filter((listItem) => listItem !== DEFAULT_LIST)
        .map((listItem) => {
          const totalItems = items.get(selectedList).size
          return (
            <ListSnippet
              listName={listItem}
              totalItems={totalItems}
              onDelete={this.handleDeleteList}
              onDownload={this.handleDownload}
              onSelect={this.handleSelectList}
            />
          )
        })
    } else {
      /* in these case we just render back button */
      renderLists = (
        <ListSnippet
          listName={DEFAULT_LIST}
          onDelete={this.handleDeleteList}
          onDownload={this.handleDownload}
          onSelect={this.handleSelectList}
        />
      )
    }

    // const renderPictograms = pictograms.map((pictogram) => (
    //   <PictogramSnippet
    //     pictogram={pictogram}
    //     searchText={searchText}
    //     locale={locale}
    //     key={pictogram.idPictogram}
    //     showExtra={width === LARGE}
    //     onAddFavorite={this.props.onAddFavorite}
    //   />
    // ))

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
          </Masonry>
        ) : (
          <ul>{renderLists}</ul>
        )}
      </div>
    )
  }
}

FavoriteList.propTypes = {
  items: PropTypes.object,
  width: PropTypes.number.isRequired
}

export default withWidth()(FavoriteList)
