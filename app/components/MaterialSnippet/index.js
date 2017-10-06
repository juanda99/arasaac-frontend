import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Map, List } from 'immutable'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import { lightGreen400, lightGreen800 } from 'material-ui/styles/colors'
import { Row, Col } from 'react-flexbox-grid'
import ActivityIcon from 'material-ui/svg-icons/action/input'
import AreaIcon from 'material-ui/svg-icons/social/school'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FilterList from 'material-ui/svg-icons/content/filter-list'
import Favorite from 'material-ui/svg-icons/action/favorite'
import IconButton from 'material-ui/IconButton'
// import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import ReactSlidy from 'react-slidy'
import '!!style-loader!css-loader!./index.css'
import ReadMore from 'components/ReadMore'
import H2 from 'components/H2'
import Ribbon from 'components/Ribbon'
import activity from 'data/activity'
import area from 'data/area'
import Item from './Item'
import testImage from './prueba.png'
// import language from 'data/language'
// import LanguageIcon from 'material-ui/svg-icons/action/translate'
// import LanguageIcon from 'material-ui/svg-icons/social/public'


const styles = {
  chip: {
    margin: '4px',
  },
  labelChip: {
    fontSize: '0.7rem',
    paddingLeft: '8px',
    paddingRight: '8px',
    lineHeight: '1.8rem'
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  snippet: {
    padding: '1rem'
  }
}

export class MaterialSnippet extends PureComponent {

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
    const { material, locale, filtersMap } = this.props
    const activityTags = material.activity.map((id) => {
      if (filtersMap.get('activity').includes(id)) {
        return (
          <Chip
            backgroundColor={lightGreen400}
            style={styles.chip}
            key={id}
            labelStyle={styles.labelChip}
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
          labelStyle={styles.labelChip}
        >
          <Avatar color='#444' size={30} icon={<ActivityIcon />} />
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
            labelStyle={styles.labelChip}
          >
            <Avatar color={'white'} size={15} backgroundColor={lightGreen800} icon={<AreaIcon iconStyle={{width: '10px', height: '10px'}} />} />
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
          labelStyle={styles.labelChip}
        >
          <Avatar color='#444' size={15} icon={<AreaIcon />} />
          {area[id]}
        </Chip>
      )
    })
    // const languageTags = material.translations.map((translation) => <Chip style={styles.chip} key={translation.language}><Avatar color='#444' icon={<LanguageIcon />} />{language[translation.language]}</Chip>)
    // languageTags.push(<Chip style={styles.chip} key={material.language}><Avatar color='#222' icon={<LanguageIcon />} />{language[material.language]}</Chip>)
    return (
      <Item url={`materials/${material.idMaterial}`}>
        <Ribbon />
        <Row middle='xs'>
          <Col lg={7} style={styles.snippet}>
            <H2 primary ucase>{material.title}</H2>
            <IconButton>
              <FilterList />
            </IconButton>
            <IconButton>
              <Favorite />
            </IconButton>
            <ReadMore>
              {material.desc}
            </ReadMore>
            <div style={styles.wrapper}>
              {activityTags}
            </div>
            <div style={styles.wrapper}>
              {areaTags}
            </div>
          </Col>
          <Col lg={5} first='lg' style={{ position: 'relative' }}>
            <ReactSlidy infinite={false}>
              <img src={testImage} alt='' />
              <img src={testImage} alt='' />
            </ReactSlidy>
            <IconButton style={{ position: 'absolute', top: '-1 0px', left: '0px', zIndex: 10000 }}>
              <ContentAdd />
            </IconButton>
          </Col>
        </Row>
      </Item>
    )
  }
}


// needed for tests: seee https://github.com/facebook/jest/issues/1824
MaterialSnippet.displayName = 'MaterialSnippet'

MaterialSnippet.propTypes = {
  // onClick: PropTypes.func.isRequired,
  material: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  filtersMap: PropTypes.instanceOf(Map).isRequired,
  setFilterItems: PropTypes.func.isRequired
}

export default MaterialSnippet
