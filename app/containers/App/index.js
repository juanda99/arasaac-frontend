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

import React, { Component } from "react";
import PropTypes from "prop-types";
import { ImmutableLoadingBar as LoadingBar } from "react-redux-loading-bar";
// import Helmet from 'react-helmet'
// import styled from 'styled-components'
import Header from "components/Header";
import Footer from "components/Footer";
import Menu from "components/Menu";
import muiThemeable from "material-ui/styles/muiThemeable";
import { FormattedMessage } from "react-intl";
import Joyride from "react-joyride";
import Div from "components/Div";
import "react-joyride/lib/react-joyride.scss";
import messages from "./messages";
import Wrapper from "./Wrapper";
import { connect } from "react-redux";
import spacing from "material-ui/styles/spacing";
import { white } from "material-ui/styles/colors";
import withWidth, { LARGE, SMALL } from "material-ui/utils/withWidth";
import {
  changeLocale,
  startTranslation,
  stopTranslation
} from "containers/LanguageProvider/actions";
import { logout, activation } from "./actions";
import { makeSelectHasUser, makeSelectRole } from "./selectors";

class App extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    children: PropTypes.node,
    location: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    changeLocale: PropTypes.func,
    joyride: PropTypes.shape({
      autoStart: PropTypes.bool,
      callback: PropTypes.func,
      run: PropTypes.bool
    })
  };

  static defaultProps = {
    joyride: {
      autoStart: false,
      resizeDebounce: false,
      run: true
    }
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  }; // import { makeSelectLocale } from 'containers/LanguageProvider/selectors'

  state = {
    menuOpen: false,
    /* react-joyride state */
    autoStart: false,
    running: false,
    step: 0,
    steps: [
      {
        title: "Open menu",
        text: "Click the button to navigate through ARASAAC website",
        textAlign: "center",
        selector: "#header button",
        position: "bottom"
      },
      {
        title: "User menu",
        text: "User specific actions: profile, registration...",
        selector: "#header div button",
        position: "bottom"
      },
      {
        title: "Pictograms",
        text: "Search and select pictograms",
        selector: "#lstpictograms",
        position: "right"
      },
      {
        title: "Materials",
        text: "Search or upload&share materials",
        selector: "#lstmaterials",
        position: "right"
      }
    ]
  };


  handleTranslate = () => {
    if (!this.props.isTranslating) {
      this.props.startTranslation();
      const script = document.createElement("script");
      script.src = "//cdn.crowdin.com/jipt/jipt.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      this.props.stopTranslation();
    }
  };

  getStyles() {
    const styles = {
      LoadingBar: {
        height: 2,
        backgroundColor: "rgb(0, 188, 212)",
        zIndex: 100000
      }
    };
    return styles;
  }

  getViewProps(width) {
    let title = "";
    let docked = width === LARGE;
    const url = this.props.location.pathname;
    if (url === "/") docked = false;
    switch (true) {
      case /pictograms\/search/.test(url):
        title = <FormattedMessage {...messages.pictogramsSearch} />;
        break;
      case /materials\/search/.test(url):
        title = <FormattedMessage {...messages.materialsSearch} />;
        break;
      case /catalogs/.test(url):
        title = <FormattedMessage {...messages.catalogs} />;
        break;
      case /materials/.test(url):
        title = <FormattedMessage {...messages.materials} />;
        break;
      case /pictograms/.test(url):
        title = <FormattedMessage {...messages.pictograms} />;
        break;
      case /activate/.test(url):
        title = <FormattedMessage {...messages.userActivation} />;
        break;
      case /recoverpassword/.test(url):
        title = <FormattedMessage {...messages.recoverPassword} />;
        break;
      case /onlinetools/.test(url):
        title = <FormattedMessage {...messages.onlineTools} />;
        break;
      case /software/.test(url):
        title = <FormattedMessage {...messages.software} />;
        break;
      case /signin/.test(url):
        title = <FormattedMessage {...messages.signinTitle} />;
        docked = false;
        break;
      case /register/.test(url):
        title = <FormattedMessage {...messages.registerTitle} />;
        docked = false;
        break;
      case /profile/.test(url):
        title = <FormattedMessage {...messages.userProfileTitle} />;
        break;
      case /configuration/.test(url):
        title = <FormattedMessage {...messages.configurationTitle} />;
        break;
      case /developers\/api/.test(url):
        title = <FormattedMessage {...messages.api} />;
        break;
      case /developers\/accounts/.test(url):
        title = <FormattedMessage {...messages.devAccounts} />;
        break;
      case /developers/.test(url):
        title = <FormattedMessage {...messages.howto} />;
        break;
      case /uploadmaterial/.test(url):
        title = <FormattedMessage {...messages.configurationTitle} />;
        break;
      case /contact-us/.test(url):
        title = <FormattedMessage {...messages.contactusTitle} />;
        break;
      case /collaborate/.test(url):
        title = <FormattedMessage {...messages.collaborateTitle} />;
        break;
      case /world/.test(url):
        title = <FormattedMessage {...messages.arasaacWorld} />;
        break;
      case /settings/.test(url):
        title = <FormattedMessage {...messages.settings} />;
        break;
      case /activate/.test(url):
        title = <FormattedMessage {...messages.userActivation} />;
        break;
      case /prizes/.test(url):
        title = <FormattedMessage {...messages.prizes} />;
        break;
      case /about-us/.test(url):
        title = <FormattedMessage {...messages.aboutUs} />;
        break;
      case /translate/.test(url):
        title = <FormattedMessage {...messages.translate} />;
        break;
      default:
        docked = false;
        break;
    }
    return { docked, title };
  }

  handleTouchTapLeftIconButton = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  };

  handleChangeRequestNavDrawer = open => {
    this.setState({
      menuOpen: open
    });
  };

  getChildContext() {
    return { isAuthenticated: this.props.isAuthenticated };
  }

  handleChangeList = (event, value) => {
    if (value) {
      this.context.router.push(value);
      this.setState({
        menuOpen: false
      });
    }
  };

  handleJoyrideCallback = result => {
    const { joyride } = this.props;

    if (result.type === "step:before") {
      // Keep internal state in sync with joyride
      this.setState({ step: result.index });
      if (result.index === 1) this.setState({ menuOpen: true });
    }

    if (result.type === "finished" && this.state.running) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.setState({ running: false });
    }

    if (result.type === "error:target_not_found") {
      this.setState({
        step: result.action === "back" ? result.index - 1 : result.index + 1,
        autoStart: result.action !== "close" && result.action !== "esc"
      });
    }

    if (typeof joyride.callback === "function") {
      joyride.callback();
    }
  };

  render() {
    const {
      location,
      children,
      isAuthenticated,
      width,
      isTranslating,
      logout,
      role
    } = this.props;

    // if (location.hash) {
    //   const authData = location.hash.substring(1)
    //   const data = JSON.parse(
    //     '{"' +
    //       decodeURI(authData)
    //         .replace(/"/g, '\\"')
    //         .replace(/&/g, '","')
    //         .replace(/=/g, '":"') +
    //       '"}'
    //   )
    //   console.log(JSON.stringify(data))
    // }

    let { menuOpen } = this.state;

    const { joyride } = this.props;
    const joyrideProps = {
      autoStart: joyride.autoStart || this.state.autoStart,
      callback: this.handleJoyrideCallback,
      // debug: true,
      disableOverlay: this.state.step === 1,
      resizeDebounce: joyride.resizeDebounce,
      run: joyride.run || this.state.running,
      scrollToFirstStep: joyride.scrollToFirstStep || false,
      stepIndex: joyride.stepIndex || this.state.step,
      steps: joyride.steps || this.state.steps,
      type: joyride.type || "continuous",
      scrollOffset: 200
    };

    const styles = this.getStyles();

    const { title, docked } = this.getViewProps(width);

    let showMenuIconButton = true;
    let isMobile = width === SMALL;
    if (width === LARGE && docked) {
      menuOpen = true;
      showMenuIconButton = false;
    }
    return (
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Joyride {...joyrideProps} ref={c => (this.joyride = c)} />
        <Header
          showMenuIconButton={showMenuIconButton}
          isAuthenticated={isAuthenticated}
          title={title}
          touchTapLeftIconButton={this.handleTouchTapLeftIconButton}
          zDepth={0}
          docked={docked}
          changeLocale={this.handleTranslate}
          signout={logout}
          isTranslating={isTranslating}
          isMobile={isMobile}
          role={role}
        />
        <LoadingBar
          updateTime={100}
          maxProgress={95}
          progressIncrease={20}
          style={styles.LoadingBar}
        />
        <Wrapper id="wrapper" docked={docked}>
          {children}
        </Wrapper>
        <Menu
          location={location}
          docked={docked}
          onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
          onChangeList={this.handleChangeList}
          open={menuOpen}
          isAuthenticated={isAuthenticated}
          signout={logout}
          isMobile={isMobile}
        />
        <Footer docked={docked} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  const auth = state.getIn(["auth", "isActivating"]);
  const locale = state.getIn(["language", "locale"]);
  const isTranslating = locale === "af";
  const isAuthenticated = (makeSelectHasUser()(state) && true) || false;
  const role = makeSelectRole()(state)
  return {
    isAuthenticated,
    locale,
    isTranslating,
    role
  };
};

export default connect(mapStateToProps, {
  changeLocale,
  logout,
  startTranslation,
  stopTranslation
})(withWidth()(App));

App.childContextTypes = {
  isAuthenticated: PropTypes.bool
};
