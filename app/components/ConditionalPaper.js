/*
 *
 * LoginView
 *
 */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import withWidth, { SMALL } from "material-ui/utils/withWidth";
import Paper from "material-ui/Paper";

const styles = {
  paper: {
    padding: 20,
    width: 400,
    margin: "0 auto",
  },
  div: {
    padding: 10,
  },
};

class ConditionalPaper extends PureComponent {
  render() {
    const { width, children } = this.props;
    const isSmall = SMALL === width;
    return (
      <div>
        {isSmall ? (
          <div style={styles.div}> {children} </div>
        ) : (
          <Paper zDepth={2} style={styles.paper}>
            {" "}
            {children}{" "}
          </Paper>
        )}
      </div>
    );
  }
}

ConditionalPaper.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
  width: PropTypes.number.isRequired,
};

export default withWidth()(ConditionalPaper);
