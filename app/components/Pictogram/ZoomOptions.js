/* eslint no-mixed-operators: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import Slider from "material-ui/Slider";
import P from "components/P";
import ToggleDropDown from "./ToggleDropdown";
import messages from "./messages";
import styles from "./styles";
import BoxOptions from "./BoxOptions";

class ZoomOptions extends Component {
  static propTypes = {
    onActive: PropTypes.func.isRequired,
    zoomLevel: PropTypes.number.isRequired,
    onZoomChange: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    showOptions: PropTypes.bool.isRequired,
    onOptionsShow: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  handleZoomChange = (event, value) => {
    this.props.onZoomChange(value);
  };

  handleActive = (active) => this.props.onActive(active);

  handleOptionsShow = () => this.props.onOptionsShow(!this.props.showOptions);

  render() {
    const { zoomLevel, showOptions, active, intl } = this.props;
    const { formatMessage } = intl;
    const marginBottom = showOptions ? "150px" : "auto";
    return (
      <div style={{ marginBottom }}>
        <ToggleDropDown
          toggled={active}
          onToggle={this.handleActive}
          label={formatMessage(messages.zoomLevel)}
          style={styles.toggle}
          showOptions={showOptions}
          onClick={this.handleOptionsShow}
        />
        {showOptions ? (
          <BoxOptions>
            <P>
              {formatMessage(messages.chooseZoom)} {zoomLevel}%
            </P>
            <Slider
              min={-400}
              max={+800}
              step={1}
              value={zoomLevel}
              onChange={this.handleZoomChange}
            />
          </BoxOptions>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default injectIntl(ZoomOptions);
