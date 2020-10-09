import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import withWidth, { SMALL } from "material-ui/utils/withWidth";
import Paper from "material-ui/Paper";

/**
 *
 * ConditionalPaper.js
 *
 * This component is used for pictogram snippets and for Catalog component.
 * Should also be used for login
 */

// TODO: Move ConditionalPaper out of here

class ConditionalPaper extends PureComponent {
  state = {
    zDepth: 1,
  };

  handleMouseEnter = () => {
    this.setState({
      zDepth: 3,
    });
  };

  handleMouseLeave = () => {
    this.setState({
      zDepth: 1,
    });
  };

  render() {
    const { width, children, style } = this.props;
    const isSmall = SMALL === width;
    return (
      <div>
        {isSmall ? (
          <div> {children} </div>
        ) : (
          <Paper
            zDepth={this.state.zDepth}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            style={style}
          >
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
  style: PropTypes.object,
};

export default withWidth()(ConditionalPaper);
