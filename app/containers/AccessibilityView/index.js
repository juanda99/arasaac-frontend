/*
 *
 * AccessibilityView
 *
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import RaisedButton from 'material-ui/RaisedButton'
import Slider from 'material-ui/Slider'
import View from 'components/View'
import Helmet from 'react-helmet'
import H2 from 'components/H2'
import { THEMES, changeTheme } from 'containers/ThemeProvider/actions'
import { changeLocale } from 'containers/LanguageProvider/actions'
import messages from './messages'



/**
 * The `defaultValue` property sets the initial position of the slider.
 * The slider appearance changes when not at the starting position.
 */
const SliderExampleSimple = () => (
  <div>
    <Slider min={0} max={200} step={25} />
  </div>
)

class AccessibilityView extends React.Component {

  handleClick = (theme) => { this.props.changeTheme(theme) }

  render() {
    return (
      <View left={true} right={true}>
        <Helmet
          title='Accessibility'
          meta={[
            { name: 'description', content: 'Description of MaterialView' }
          ]}
        />
        <H2 primary={true}> Tamaño del texto </H2>
        <SliderExampleSimple/>
        <h2>Tamaño de fuente</h2>
        <p>lorem.ipsum</p>
        <h2>Theme</h2>
        <RaisedButton label={THEMES.DARK} primary={true} onClick={() => { this.handleClick(THEMES.DARK) }} />
        <RaisedButton label={THEMES.LIGHT} primary={true} onClick={() => { this.handleClick(THEMES.LIGHT) }} />
      </View>
    )
  }
}




const mapStateToProps = (state) => {
  const locale = state.getIn(['language', 'locale'])
  const theme = state.get('theme')
  return ({
    locale,
    theme
  })
}

const mapDispatchToProps = (dispatch) => ({
  changeTheme: (theme) => {
    dispatch(changeTheme(theme))
  }
})


AccessibilityView.propTypes = {
  changeLocale: PropTypes.func.isRequired,
  changeTheme: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessibilityView)
