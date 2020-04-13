import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import View from 'components/View'
import AAC from 'components/AAC'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import ReadMargin from 'components/ReadMargin'
class IntroAAC extends Component {


  render() {
    const { locale } = this.props
    return (
      <View left={true} right={true}>
        <ReadMargin>
          <AAC />
        </ReadMargin>
      </View >
    )
  }
}

const mapStateToProps = (state) => ({
  locale: makeSelectLocale()(state)
})

export default connect(
  mapStateToProps
)(IntroAAC)

IntroAAC.propTypes = {
  locale: PropTypes.string.isRequired,
}
