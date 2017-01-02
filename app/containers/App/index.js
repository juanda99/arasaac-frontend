/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

/* eslint-disable */

import React, { Component, PropTypes } from 'react'
// import Helmet from 'react-helmet'
// import styled from 'styled-components'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Menu from 'components/Menu'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import Wrapper from './Wrapper'
import { connect } from 'react-redux'
import spacing from 'material-ui/styles/spacing'
import { white } from 'material-ui/styles/colors'
import withWidth, { MEDIUM, LARGE } from 'material-ui/utils/withWidth'
import { changeLocale } from 'containers/LanguageProvider/actions'


class App extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    children: PropTypes.node,
    location: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    changeLocale: PropTypes.func
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }


   constructor(props) {
    super(props)
    this.state = {     
      menuOpen: false
    }
    console.log('again to the constructor')
  }


  handleTranslate = () => {
    if (!this.props.isTranslating) {
      const script = document.createElement('script')
      script.src = '//cdn.crowdin.com/jipt/jipt.js'
      script.async = true
      document.body.appendChild(script)
      this.props.changeLocale('af')
    }
    else {
      this.props.changeLocale('es')
      window.location.href = "http://localhost:3000";
    }
    /*
    if (!this.state.isTranslating) {
      this.props.changeLocale('af')
    }
    else {
      this.props.changeLocale('es')
    }
    console.log ('pasa por aquí')
    */
    /*
    if (this.state.loadScripts) {

      this.setState({loadScript: false})
    }
    */
  }


  getStyles() {
    const styles = {
      content: {
        margin: spacing.desktopGutter
      },
      contentWhenMedium: {
        margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`
      },
      a: {
        color: white
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: white,
        maxWidth: 450
      },
      iconButton: {
        color: white
      }
    }

    if (this.props.width === MEDIUM || this.props.width === LARGE) {
      styles.content = Object.assign(styles.content, styles.contentWhenMedium)
    }
    return styles
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

  handleTouchTapLeftIconButton = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  handleChangeRequestNavDrawer = (open) => {
    this.setState({
      menuOpen: open
    })
  }

  handleChangeList = (event, value) => {
    this.context.router.push(value)
    this.setState({
      menuOpen: false
    })
  }

  render() {
    const {
      location,
      children,
      isAuthenticated,
      width,
      isTranslating
    } = this.props

    let {
      menuOpen
    } = this.state


    const styles = this.getStyles()

    const { title, docked } = this.getViewProps(width)

    let showMenuIconButton = true
    if (width === LARGE && docked) {
      menuOpen = true
      showMenuIconButton = false
    }
    return (
      <div>
        <Header
          showMenuIconButton={showMenuIconButton} isAuthenticated={isAuthenticated} title={title}
          touchTapLeftIconButton={this.handleTouchTapLeftIconButton} zDepth={0} docked={docked}
          changeLocale = {this.handleTranslate} isTranslating = {isTranslating}
        />
        <Wrapper docked={docked}>
          {children}
        </Wrapper>
        <Menu
          location={location}
          docked={docked}
          onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
          onChangeList={this.handleChangeList}
          open={menuOpen}
        />
        <Footer docked={docked} style={styles.footer} />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  const locale = state.getIn(['language', 'locale'])
  const isTranslating = locale === 'af'
  const isAuthenticated = true // state.getIn(['auth', 'token']) && true || false
  // TODO:
  // token needs validation!
  return({
     isAuthenticated,
     locale,
     isTranslating
  })
}

export default connect(mapStateToProps, {changeLocale})(withWidth()(App))
