/*
 *
 * PictogramsView
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import Helmet from 'react-helmet'
import SearchBox from 'components/SearchBox'
import Toggle from 'material-ui/Toggle'
import { withRouter } from 'react-router'

// import FilterPictograms from 'components/Filter/Filter'

// import selectPictogramsView from './selectors'
import messages from './messages'

// import { resetErrorMessage } from 'redux/modules/error'
// import { loadKeywords } from 'redux/modules/keywords'
// import { toggleShowFilter } from 'redux/modules/showFilter'


export class PictogramsView extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount = () => {
    // this.props.loadKeywords(this.props.locale)
  }

  handleDismissClick = (e) => {
    // this.props.resetErrorMessage()
    e.preventDefault()
  }

  handleChange = (nextValue) => {
    this.props.router.push(`/pictograms/search/${nextValue}`)
  }

  renderErrorMessage = () => {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }
    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href='#' onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    )
  }
  render() {
    return (
      <div>
        <Helmet
          title='PictogramsView'
          meta={[
            { name: 'description', content: 'Description of PictogramsView' }
          ]}
        />
        <SearchBox />
      </div>
    )
  }
}


export default (withRouter(PictogramsView))
// export default connect(mapStateToProps, {resetErrorMessage, loadKeywords, toggleShowFilter})(withRouter(PictogramsView))
