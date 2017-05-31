import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
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


const MaterialSnippet = ({ material, locale, viewMaterial }) => {
  const handleClick = () => {
    viewMaterial(material.idMaterial)
  }
  /* How we show messages...*/
  /* catalan: ca, va, es, en, ...*/
  /* br: pt, br, en, ....*/
  /* eu: eu, es, en, ....*/
  /* ga: ga, es, en, .....*/
  const activityTags = material.activity.map((id) => <Chip style={styles.chip} key={id}><Avatar color='#444' icon={<ActivityIcon />} />{activity[id]}</Chip>)
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
  viewMaterial: PropTypes.func.isRequired
}

export default MaterialSnippet
