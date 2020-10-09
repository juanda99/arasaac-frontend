import React, { Component } from "react";
import PropTypes from "prop-types";
import Truncate from "react-truncate";
import { FormattedMessage } from "react-intl";
import A from "components/A";
import messages from "./messages";

class ReadMore extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      expanded: false,
      truncated: false,
    };
    this.handleTruncate = this.handleTruncate.bind(this);
    this.toggleLines = this.toggleLines.bind(this);
  }

  handleTruncate(truncated) {
    if (this.state.truncated !== truncated) {
      this.setState({
        truncated,
      });
    }
  }

  toggleLines(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const { children, lines } = this.props;

    const { expanded, truncated } = this.state;

    return (
      <div style={{ fontSize: "1rem" }}>
        <Truncate
          lines={!expanded && lines}
          ellipsis={
            <span>
              {" "}
              <A onClick={this.toggleLines}>
                {<FormattedMessage {...messages.readmore} />}
              </A>
            </span>
          }
          onTruncate={this.handleTruncate}
        >
          {children}
        </Truncate>
        {!truncated && expanded && (
          <span>
            {" "}
            <A onClick={this.toggleLines}>
              {<FormattedMessage {...messages.showless} />}
            </A>
          </span>
        )}
      </div>
    );
  }
}

ReadMore.defaultProps = {
  lines: 3,
  more: "Read more",
  less: "Show less",
};

ReadMore.propTypes = {
  children: PropTypes.node.isRequired,
  lines: PropTypes.number,
  htmlText: PropTypes.string,
};

export default ReadMore;
