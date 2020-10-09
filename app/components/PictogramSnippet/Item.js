/**
 *
 * Item
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

class Item extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;
    return <Link to={this.props.url}>{children}</Link>;
  }
}

export default Item;
