import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import withWidth, { SMALL } from 'material-ui/utils/withWidth'
import Presentation from 'components/Presentation'
import Welcome from 'components/Welcome'
import Showcase from 'components/Showcase'
import Participate from 'components/Participate'
import { makeSelectRunTour } from './selectors'
import { selectTheme } from 'containers/ThemeProvider/selectors'
import { startTour, stopTour } from './actions'


class HomePage extends PureComponent {

  render() {
    const { run, startTour, theme } = this.props
    console.log(theme, 'adfaddfadsfdf')
    return (
      <div>
        <Presentation run={run} onStart={startTour} />
        <Welcome theme={theme} />
        <Showcase />
        <Participate />
      </div>
    )
  }
}

HomePage.propTypes = {
  router: PropTypes.any.isRequired,
  width: PropTypes.number.isRequired,
  run: PropTypes.bool.isRequired,
  startTour: PropTypes.func.isRequired,
  stopTour: PropTypes.func.isRequired,
}




const mapStateToProps = (state) => ({
  run: makeSelectRunTour()(state),
  theme: selectTheme()(state)
})

const mapDispatchToProps = (dispatch) => ({
  startTour: () => {
    dispatch(startTour())
  },
  stopTour: () => {
    dispatch(stopTour())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withWidth()(HomePage)))
