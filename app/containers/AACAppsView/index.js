import React, { Component } from 'react'
import View from 'components/View'
import { connect } from 'react-redux'
import ReadMargin from 'components/ReadMargin'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import AACApps from 'components/AACApps'
class AACAppsView extends Component {
  render() {
    return (
      <View left={true} right={true}>
        <ReadMargin>
          <AACApps locale={this.props.locale} />
        </ReadMargin>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: makeSelectLocale()(state),
})

export default connect(mapStateToProps)(AACAppsView)
