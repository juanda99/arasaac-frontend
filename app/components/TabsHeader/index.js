/**
 *
 * Button: needed for several buttons which similar behaviour together,
 * see: https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
 * see: theme buttons here in code
 */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab } from "material-ui/Tabs";
import SearchIcon from "material-ui/svg-icons/action/search";
import withWidth, { SMALL } from "material-ui/utils/withWidth";
import NewReleasesIcon from "material-ui/svg-icons/av/new-releases";
import { FormattedMessage } from "react-intl";
import messages from "./messages";

class TabsHeader extends PureComponent {
  handleChange = (value) => {
    this.props.onChange(value);
  };

  render() {
    const { value, width } = this.props;
    const hideIconText = width === SMALL;
    return (
      <Tabs onChange={this.handleChange} value={value}>
        <Tab
          label={hideIconText ? "" : <FormattedMessage {...messages.search} />}
          icon={<SearchIcon />}
          value={0}
        />
        <Tab
          label={hideIconText ? "" : <FormattedMessage {...messages.new} />}
          icon={<NewReleasesIcon />}
          value={1}
        />
      </Tabs>
    );
  }
}

TabsHeader.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default withWidth()(TabsHeader);
