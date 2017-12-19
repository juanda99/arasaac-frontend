/*
 *
 * AccessibilityView
 *
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import Slider from 'material-ui/Slider'
import View from 'components/View'
import Helmet from 'react-helmet'
import H2 from 'components/H2'
import Button from 'components/Button'
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

class SettingsView extends React.Component {

  handleClick = (theme) => { this.props.changeTheme(theme) }

  render() {
    const { changeTheme, theme } = this.props
    return (
      <View left={true} right={true}>
        <Helmet
          title='Settings'
          meta={[
            { name: 'description', content: 'Description of MaterialView' }
          ]}
        />
        <H2 primary={true}> Tamaño del texto </H2>
        <SliderExampleSimple />
        <h2>Tamaño de fuente</h2>
        <p>lorem.ipsum</p>
        <h2>Theme</h2>
        {
          THEMES.map((value) =>
            <Button
              key={value}
              label={value}
              value={value}
              onClick={changeTheme}
              style={{ margin: 12 }}
              curval={theme}
            />)
        }

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


SettingsView.propTypes = {
  changeLocale: PropTypes.func.isRequired,
  changeTheme: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  theme: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView)
