import React, { Component } from 'react'
import View from 'components/View'
import ReadMargin from 'components/ReadMargin'
import AACApps from '../../components/AACApps'
class AACAppsView extends Component {
  render() {
    return (
      <View left={true} right={true}>
        <ReadMargin>
          <AACApps />
        </ReadMargin>
      </View>
    )
  }
}

export default AACAppsView
