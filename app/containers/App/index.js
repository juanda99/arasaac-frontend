/**
 *
 * App.react.js
 *
 */


import React, { PropTypes } from 'react'
import withWidth, { MEDIUM, LARGE } from 'material-ui/utils/withWidth'
// import LoadingBar from 'containers/LoadingBar'
import Header from 'containers/Header'
import Footer from 'containers/Footer'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import Wrapper from './Wrapper'

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: PropTypes.node,
    width: PropTypes.number.isRequired,
    location: PropTypes.object
  }

  getViewProps(width) {
    let title = ''
    let docked = false
    const url = this.props.location.pathname
    switch (true) {
      case /api/.test(url):
        title = <FormattedMessage {...messages.api} />
        docked = width === LARGE
        break
      case /search/.test(url):
        title = <FormattedMessage {...messages.pictogramsSearch} />
        docked = width === LARGE
        break
      case /catalogs/.test(url):
        title = <FormattedMessage {...messages.catalogs} />
        docked = width === LARGE
        break
      case /materials/.test(url):
        title = <FormattedMessage {...messages.materials} />
        docked = width === LARGE
        break
      case /onlinetools/.test(url):
        title = <FormattedMessage {...messages.onlineTools} />
        docked = width === LARGE
        break
      case /software/.test(url):
        title = <FormattedMessage {...messages.software} />
        docked = width === LARGE
        break
      case /signin/.test(url):
        title = <FormattedMessage {...messages.signinTitle} />
        docked = false
        break
      case /register/.test(url):
        title = <FormattedMessage {...messages.registerTitle} />
        docked = false
        break
      case /profile/.test(url):
        title = <FormattedMessage {...messages.userProfileTitle} />
        docked = width === LARGE
        break
      case /configuration/.test(url):
        title = <FormattedMessage {...messages.configurationTitle} />
        docked = width === LARGE
        break
      case /uploadmaterial/.test(url):
        title = <FormattedMessage {...messages.configurationTitle} />
        docked = width === LARGE
        break
      default:
        docked = false
        break
    }
    return { docked, title }
  }

  render() {
    const { children, width } = this.props
    const { title, docked } = this.getViewProps(width)
    return (
      <div>
        <Header title={title} docked={docked} />
        <Wrapper docked={docked}>
          {React.Children.toArray(children)}
        </Wrapper>
        <Footer />
      </div>
    )
  }
}


export default (withWidth()(App))
