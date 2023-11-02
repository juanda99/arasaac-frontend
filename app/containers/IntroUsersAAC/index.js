import React, { Component } from 'react'
import View from 'components/View'
import AACUsers from 'components/AACUsers'
import ReadMargin from 'components/ReadMargin'
class IntroUsersAAC extends Component {
  render() {
    return (
      <View left={true} right={true}>
        <ReadMargin>
          <AACUsers />
        </ReadMargin>
      </View>
    )
  }
}

export default IntroUsersAAC
