/*
 *
 * apiView
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import ReadMargin from 'components/ReadMargin'
import View from 'components/View'
import P from 'components/P'
import messages from './messages'

class WorldView extends PureComponent {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <View left={true}>
          <ReadMargin>
            <P><FormattedMessage {...messages.arasaacInWorld} /></P>
          </ReadMargin>

        </View>
        <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1EBR3psLxK-G_WujU93NMWkfisTYK4HwY" width="100%" height="800"></iframe>
      </div>
    )
  }
}

WorldView.propTypes = {
  theme: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  theme: state.get('theme')
})

export default connect(mapStateToProps)(WorldView)
