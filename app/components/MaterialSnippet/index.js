import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Map, List } from 'immutable'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import { lightGreen400, lightGreen800 } from 'material-ui/styles/colors'
import ActivityIcon from 'material-ui/svg-icons/action/input'
import AreaIcon from 'material-ui/svg-icons/social/school'
import ReadMore from 'components/ReadMore'
import H2 from 'components/H2'
import Ribbon from 'components/Ribbon'
import activity from 'data/activity'
import area from 'data/area'
import ImageSlider from 'components/ImageSlider'
import Item from './Item'

const styles = {
  chip: {
    margin: '4px'
  },
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
    // setFilterItems()
    return false
  }
  /* How we show messages...*/
  /* catalan: ca, va, es, en, ...*/
  /* br: pt, br, en, ....*/
  /* eu: eu, es, en, ....*/
  /* ga: ga, es, en, .....*/

  render() {
    const { material, locale, filtersMap, showLabels } = this.props
    const activityTags = material.activity.map((id) => {
      if (filtersMap.get('activity').includes(id)) {
        return (
          <Chip
            backgroundColor={lightGreen400}
            style={styles.chip}
            key={id}
            onClick={(e) => this.handleTouchTap('activity', id, 0, e)}
          >
            <Avatar color={'white'} size={30} backgroundColor={lightGreen800} icon={<ActivityIcon />} />
            {activity[id]}
          </Chip>
        )
      }
      /* if not in filter, return icons without backgroundColor */
      return (
        <Chip
          style={styles.chip}
          key={id}
          onClick={(e) => this.handleTouchTap('activity', id, 1, e)}
        >
          <Avatar icon={<ActivityIcon />} />
          {activity[id]}
        </Chip>
      )
    })
    const areaTags = material.area.map((id) => {
      if (filtersMap.get('area').includes(id)) {
        return (
          <Chip
            backgroundColor={lightGreen400}
            style={styles.chip}
            key={id}
            onClick={(e) => this.handleTouchTap('area', id, 0, e)}
          >
            <Avatar color={'white'} backgroundColor={lightGreen800} icon={<AreaIcon iconStyle={{ width: '10px', height: '10px' }} />} />
            {area[id]}
          </Chip>
        )
      }
      /* if not in filter, return icons without backgroundColor */
      return (
        <Chip
          style={styles.chip}
          key={id}
          onClick={(e) => this.handleTouchTap('area', id, 1, e)}
        >
          <Avatar icon={<AreaIcon />} />
          {area[id]}
        </Chip>
      )
    })

    const images = [...material.commonScreenshots || [], ...material.screenshots[locale] || []]
    // const languageTags = material.translations.map((translation) => <Chip style={styles.chip} key={translation.language}><Avatar color='#444' icon={<LanguageIcon />} />{language[translation.language]}</Chip>)
    // languageTags.push(<Chip style={styles.chip} key={material.language}><Avatar color='#222' icon={<LanguageIcon />} />{language[material.language]}</Chip>)
    return (
      <Item url={`/materials/${material.idMaterial}`}>
        { material.favorite ? <Ribbon /> : '' }
        <div style={styles.snippet}>
          <ImageSlider images={images} id={material.idMaterial} style={styles.snippetImg} />
          <div style={styles.snippetText}>
            <H2 primary ucase>{material.title}</H2>
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
