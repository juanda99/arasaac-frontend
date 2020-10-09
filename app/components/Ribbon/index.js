import React, { Component } from "react";
import PropTypes from "prop-types";
import Div from "./Div";
import Span from "./Span";

class Ribbon extends Component {
  render() {
    return (
      <Div>
        <Span type={this.props.type}>{this.props.text}</Span>
      </Div>
    );
  }
}

Ribbon.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
};

Ribbon.defaultProps = {
  type: "success",
};
export default Ribbon;
