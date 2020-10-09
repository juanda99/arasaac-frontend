/**
 *
 * Item
 *
 */

import React from "react";
import PropTypes from "prop-types";
import muiThemeable from "material-ui/styles/muiThemeable";
import { Link } from "react-router";
import Paper from "material-ui/Paper";
import Image from "components/Image";
import H3 from "components/H3";
import { grey200 } from "material-ui/styles/colors";
import FullWidthSection from "components/FullWidthSection";

class Item extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    title: PropTypes.object.isRequired,
    route: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { zDepth: 1 };
  }

  handleMouseEnter = () => {
    this.setState({
      zDepth: 4,
    });
  };

  handleMouseLeave = () => {
    this.setState({
      zDepth: 1,
    });
  };

  render() {
    const { title, route, image } = this.props;
    // if extern route we use an anchor tag
    const externalLink = route.includes("http");
    const children = (
      <Paper
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <FullWidthSection
          color={this.props.muiTheme.palette.primary1Color}
          style={{ paddingBottom: 0, paddingTop: 0 }}
        >
          <H3 style={{ color: "white" }}>{title}</H3>
        </FullWidthSection>
        <Image
          src={image}
          alt={title}
          style={{ padding: 20, width: "100%", margin: 0 }}
        />
      </Paper>
    );

    return (
      <div style={{ margin: "30px" }}>
        {externalLink ? (
          <a href={route} target="_blank">
            {children}
          </a>
        ) : (
          <Link to={route}>{children}</Link>
        )}
      </div>
    );
  }
}

export default muiThemeable()(Item);
