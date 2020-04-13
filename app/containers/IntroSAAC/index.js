import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import View from 'components/View'
import SAAC from 'components/SAAC'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import ReadMargin from 'components/ReadMargin'
class IntroSAAC extends Component {


  render() {
    const { locale } = this.props
    return (
      <View left={true} right={true}>
        <ReadMargin>
          <SAAC />
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
)(IntroSAAC)

IntroSAAC.propTypes = {
  locale: PropTypes.string.isRequired,
}