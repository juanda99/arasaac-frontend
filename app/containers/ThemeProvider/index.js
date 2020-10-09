/*
 *
 * ThemeProvider
 *
 * this component connects the redux state theme to the
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { makeSelectDirection } from "containers/LanguageProvider/selectors";
import customTheme from "./customTheme";

export class ThemeProvider extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const theme = customTheme(this.props.theme, this.props.direction);
    return (
      <MuiThemeProvider muiTheme={theme}>
        {React.Children.only(this.props.children)}
      </MuiThemeProvider>
    );
  }
}

ThemeProvider.propTypes = {
  theme: PropTypes.string,
  children: PropTypes.element.isRequired,
  direction: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const theme = state.get("theme");
  const direction = makeSelectDirection()(state);
  return {
    theme,
    direction,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeProvider);
