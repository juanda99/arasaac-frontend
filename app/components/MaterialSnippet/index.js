import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Map, List } from 'immutable'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import { lightGreen400, lightGreen800 } from 'material-ui/styles/colors'
import { Row, Col } from 'react-flexbox-grid'
import ActivityIcon from 'material-ui/svg-icons/action/input'
import AreaIcon from 'material-ui/svg-icons/social/school'
import ReadMore from 'components/ReadMore'
import H2 from 'components/H2'
import Item from './Item'
import testImage from './prueba.png'
import activity from 'data/activity'
import area from 'data/area'
// import language from 'data/language'
// import LanguageIcon from 'material-ui/svg-icons/action/translate'
// import LanguageIcon from 'material-ui/svg-icons/social/public'


const styles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  paper: {
    overflow: 'auto'
  }
}

export class MaterialSnippet extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  handleExpandChange = (expanded) => {
    this.setState({ expanded })
  }

  handleToggle = (event, toggle) => {
    this.setState({ expanded })
  }

  handleExpand = () => {
    this.setState({ expanded: true })
  }

  handleReduce = () => {
    this.setState({ expanded: false })
  }

  handleClick = () => {
    const { viewMaterial, material } = this.props
    viewMaterial(material.idMaterial)
  }

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
            onClick={(e) => this.handleTouchTap('activity', id, 0, e)}
          >
            <Avatar color={'white'} backgroundColor={lightGreen800} icon={<ActivityIcon />} />
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
          <Avatar color='#444' icon={<ActivityIcon />} />
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
            <Avatar color={'white'} backgroundColor={lightGreen800} icon={<AreaIcon />} />
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
          <Avatar color='#444' icon={<AreaIcon />} />
          {area[id]}
        </Chip>
      )
    })
    // const languageTags = material.translations.map((translation) => <Chip style={styles.chip} key={translation.language}><Avatar color='#444' icon={<LanguageIcon />} />{language[translation.language]}</Chip>)
    // languageTags.push(<Chip style={styles.chip} key={material.language}><Avatar color='#222' icon={<LanguageIcon />} />{language[material.language]}</Chip>)
    return (
      <li style={{ marginTop: 20, cursor: 'pointer' }} onClick={this.handleClick}>
        <Item>
          <Row middle='xs'>
            <Col sm={4}>
              <img src={testImage} alt='' style={{ width: '90%', border: 'none' }} />
            </Col>
            <Col sm={8}>
              <H2 primary ucase>{material.title}</H2>
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
          </Row>
        </Item>
      </li>
    )
  }
}


// needed for tests: seee https://github.com/facebook/jest/issues/1824
MaterialSnippet.displayName = 'MaterialSnippet'

MaterialSnippet.propTypes = {
  // onClick: PropTypes.func.isRequired,
  material: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  viewMaterial: PropTypes.func.isRequired,
  filtersMap: PropTypes.instanceOf(Map).isRequired,
  setFilterItems: PropTypes.func.isRequired
}

export default MaterialSnippet
