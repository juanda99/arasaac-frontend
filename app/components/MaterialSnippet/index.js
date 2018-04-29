import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Map, List } from 'immutable'
import ReadMore from 'components/ReadMore'
import H2 from 'components/H2'
import Ribbon from 'components/Ribbon'
import TagsRenderer from 'components/TagsRenderer'
import ImageSlider from 'components/ImageSlider'
import { Link } from 'react-router'
import Item from './Item'

const styles = {

  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  snippetText: {
    flexGrow: 3,
    width: '600px',
    padding: '1rem'
  },
  snippet: {
    display: 'flex',
    flexWrap: 'wrap-reverse',
    width: '100%'
  },
  snippetImg: {
    flexGrow: 1,
    width: '300px'
  }
}

class MaterialSnippet extends PureComponent {

// nextStatus 0 to desactivate the filter, 1 for activating
  handleTouchTap = (filterName, filterItem, nextStatus, e) => {
    e.preventDefault()
    e.stopPropagation()
    // we get all the values from the filter
    const { setFilterItems, filtersMap } = this.props
    const filterItems = filtersMap.get(filterName).toArray()
    if (!nextStatus) {
      const i = filterItems.indexOf(filterItem)
      if (i !== -1) filterItems.splice(i, 1)
      setFilterItems(filterName, List(filterItems))
    } else {
      filterItems.push(filterItem)
      setFilterItems(filterName, List(filterItems))
    }
    return false
  }
  /* How we show messages...*/
  /* catalan: ca, va, es, en, ...*/
  /* br: pt, br, en, ....*/
  /* eu: eu, es, en, ....*/
  /* ga: ga, es, en, .....*/

  render() {
    const { material, locale, filtersMap, showLabels } = this.props
    const activityTags = (
      <TagsRenderer
        tags={material.activity}
        type={'activity'}
        selected={filtersMap.get('activity')}
        onClick={this.handleTouchTap}
      />
    )

    const areaTags = (
      <TagsRenderer
        tags={material.area}
        type={'area'}
        selected={filtersMap.get('area')}
        onClick={this.handleTouchTap}
      />
    )

    const images = [...material.commonScreenshots || [], ...material.screenshots[locale] || []]

    return (
      <Item>
        { material.favorite ? <Ribbon /> : '' }
        <div style={styles.snippet}>
          <ImageSlider images={images} id={material.idMaterial} style={styles.snippetImg} />
          <div style={styles.snippetText}>
            <Link to={`/materials/${material.idMaterial}`}>
              <H2 primary ucase>{material.title}</H2>
            </Link>
            <ReadMore style={{ textAlign: 'justify' }}>
              {material.desc}
            </ReadMore>
            {showLabels ?
              <div style={styles.wrapper}> {activityTags} {areaTags} </div>
              : ''
            }
          </div>
        </div>
      </Item>
    )
  }
}

MaterialSnippet.propTypes = {
  // onClick: PropTypes.func.isRequired,
  material: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  filtersMap: PropTypes.instanceOf(Map).isRequired,
  setFilterItems: PropTypes.func.isRequired,
  showLabels: PropTypes.bool.isRequired
}

export default MaterialSnippet
