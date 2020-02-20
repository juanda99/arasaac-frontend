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
import { startTour, stopTour } from './actions'


class HomePage extends PureComponent {
  render() {
    const { run, startTour, stopTour } = this.props
    console.log('run', run)
    return (
      <div>
        <Presentation />
        <Welcome run={run} onStart={startTour} onStop={stopTour} />
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
  run: makeSelectRunTour()(state)
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
