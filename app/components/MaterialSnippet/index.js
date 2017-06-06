import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'
import { Map } from 'immutable'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import { lightGreen400, lightGreen800 } from 'material-ui/styles/colors'
import activity from 'data/activity'
import area from 'data/area'
import language from 'data/language'
// import LanguageIcon from 'material-ui/svg-icons/action/translate'
import LanguageIcon from 'material-ui/svg-icons/social/public'
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


const MaterialSnippet = ({ material, locale, viewMaterial, filtersMap, setFilterItems }) => {
  const handleClick = () => {
    viewMaterial(material.idMaterial)
  }

  const handleRequestDelete = (filterName, filterItem) => setFilterItems()
  const handleTouchTap = () => alert('You clicked the Chip.')
  /* How we show messages...*/
  /* catalan: ca, va, es, en, ...*/
  /* br: pt, br, en, ....*/
  /* eu: eu, es, en, ....*/
  /* ga: ga, es, en, .....*/
  const activityTags = material.activity.map(
    (id) => {
      if (filtersMap.get('activity').includes(id)) {
        return (
          <Chip
            backgroundColor={lightGreen400}
            style={styles.chip}
            onRequestDelete={handleRequestDelete(id, 'activity')}
            key={id}
            onTouchTap={handleTouchTap}
          >
            <Avatar color={lightGreen800} icon={<ActivityIcon />} />
            {activity[id]}
          </Chip>
        )
      }
      return (
        <Chip
          style={styles.chip}
          key={id}
          onTouchTap={handleTouchTap}
        >
          <Avatar color='#444' icon={<ActivityIcon />} />
          {activity[id]}
        </Chip>
      )
    }
  )
  const languageTags = material.translations.map((translation) => <Chip style={styles.chip} key={translation.language}><Avatar color='#444' icon={<LanguageIcon />} />{language[translation.language]}</Chip>)
  languageTags.push(<Chip style={styles.chip} key={material.language}><Avatar color='#222' icon={<LanguageIcon />} />{language[material.language]}</Chip>)
  const areaTags = material.area.map((id) => <Chip style={styles.chip} key={id}><Avatar color='#444' icon={<AreaIcon />} />{area[id]}</Chip>)
  return (
    <li>
      <section>
        <FlatButton label={material.title} primary={true} onClick={handleClick} />
        <div style={styles.wrapper}>
          {languageTags}
          {activityTags}
          {areaTags}
        </div>
        <p>{material.desc}</p>
        <p>{locale}</p>
      </section>
    </li>
  )
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
