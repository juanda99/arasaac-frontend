import React, { PropTypes, PureComponent } from 'react'
import FlatButton from 'material-ui/FlatButton'
import { Map, List } from 'immutable'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import { lightGreen400, lightGreen800 } from 'material-ui/styles/colors'
import activity from 'data/activity'
import area from 'data/area'
// import language from 'data/language'
// import LanguageIcon from 'material-ui/svg-icons/action/translate'
// import LanguageIcon from 'material-ui/svg-icons/social/public'
import ActivityIcon from 'material-ui/svg-icons/action/input'
import AreaIcon from 'material-ui/svg-icons/social/school'

const styles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}

export class MaterialSnippet extends PureComponent {

  handleClick = () => {
    const { viewMaterial, material } = this.props
    viewMaterial(material.idMaterial)
  }

// nextStatus 0 to desactivate the filter, 1 for activating
  handleTouchTap = (filterName, filterItem, nextStatus) => {
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
            onTouchTap={() => this.handleTouchTap('activity', id, 0)}
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
          onTouchTap={() => this.handleTouchTap('activity', id, 1)}
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
            onTouchTap={() => this.handleTouchTap('area', id, 0)}
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
          onTouchTap={() => this.handleTouchTap('area', id, 1)}
        >
          <Avatar color='#444' icon={<AreaIcon />} />
          {area[id]}
        </Chip>
      )
    })
    // const languageTags = material.translations.map((translation) => <Chip style={styles.chip} key={translation.language}><Avatar color='#444' icon={<LanguageIcon />} />{language[translation.language]}</Chip>)
    // languageTags.push(<Chip style={styles.chip} key={material.language}><Avatar color='#222' icon={<LanguageIcon />} />{language[material.language]}</Chip>)
    return (
      <li>
        <section>
          <FlatButton label={material.title} primary={true} onClick={this.handleClick} />
          <div style={styles.wrapper}>
            {activityTags}
            {areaTags}
          </div>
          <p>{material.desc}</p>
          <p>{locale}</p>
        </section>
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
