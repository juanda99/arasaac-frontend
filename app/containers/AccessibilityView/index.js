/*
 *
 * AccessibilityView
 *
 */
import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Slider from 'material-ui/Slider'
import View from 'components/View'
import Helmet from 'react-helmet'
import H2 from 'components/H2'
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

  componentDidMount() {

  }
  componentWillReceiveProps() {

  }

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
      </View>
    )
  }
}

export default AccessibilityView
