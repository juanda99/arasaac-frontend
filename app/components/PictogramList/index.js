import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { PICTOGRAMS_URL } from 'services/config'
import Item from './Item'

const Masonry = require('react-masonry-component')



const masonryOptions = {
  transitionDuration: '1s'
}

const styles = {
  masonry: {
    listStyleType: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
}

export class PictogramList extends PureComponent {


  componentWillReceiveProps(nextProps) {
    if (nextProps.pictograms !== this.props.pictograms) {
    }
  }


  render() {
    const { locale, pictograms, filtersMap, setFilterItems } = this.props
    const renderPictograms = pictograms.map((pictogram) => (
      <li style={{ margin: 5 }} key={pictogram.idPictogram} className='image-element-class'>
        <Item url={`/pictograms/${pictogram.idPictogram}`}>
          <img src={`${PICTOGRAMS_URL}/${pictogram.idPictogram}_300.png`} alt='prueba' style={{ width: '100%', height: 'auto' }} />
        </Item>
      </li>
    )
    )

    return (
      <div>
        <Masonry
          className={'my-gallery-class'} // default ''
          elementType={'ul'} // default 'div'
          options={masonryOptions} // default {}
          disableImagesLoaded={false} // default false
          onClick={this.handleClick}
          style={styles.masonry}
        >
          {renderPictograms}
        </Masonry>
      </div>
    )
  }
}

PictogramList.propTypes = {
  pictograms: PropTypes.arrayOf(PropTypes.object).isRequired,
  // with optional parameters in the router is slower in my tests ????
  // rollback from https://github.com/react-boilerplate/react-boilerplate/issues/1748
  locale: PropTypes.string,
  showLabels: PropTypes.bool.isRequired,
  filtersMap: PropTypes.instanceOf(Map).isRequired,
  setFilterItems: PropTypes.func.isRequired
}

export default PictogramList
