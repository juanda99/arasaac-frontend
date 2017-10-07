/*
 *
 * AccessibilityView
 *
 */
import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import View from 'components/View'
import Helmet from 'react-helmet'
import messages from './messages'

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
            <p>Hola a todos!</p>
      </View>
    )
  }
}

export default AccessibilityView
