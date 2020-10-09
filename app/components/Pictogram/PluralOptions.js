/* eslint no-mixed-operators: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import P from "components/P";
import { smallColorSet } from "utils/colors";
import ColorPicker from "./ColorPicker";
import BoxOptions from "./BoxOptions";
import ToggleDropDown from "./ToggleDropdown";
import messages from "./messages";
import styles from "./styles";

class PluralOptions extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    onColorChange: PropTypes.func.isRequired,
    onActive: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    showOptions: PropTypes.bool.isRequired,
    onOptionsShow: PropTypes.func.isRequired,
  };

  handleActive = (active) => this.props.onActive(active);

  handleOptionsShow = () => this.props.onOptionsShow(!this.props.showOptions);

  handleColorChange = (color) => this.props.onColorChange(color);

  render() {
    const { intl, color, active, showOptions } = this.props;
    const { formatMessage } = intl;
    const marginBottom = showOptions ? "180px" : "auto";
    return (
      <div style={{ marginBottom }}>
        <ToggleDropDown
          toggled={active}
          onToggle={this.handleActive}
          label={formatMessage(messages.plural)}
          style={styles.toggle}
          showOptions={showOptions}
          onClick={this.handleOptionsShow}
        />
        {showOptions ? (
          <BoxOptions>
            <P>{formatMessage(messages.chooseColor)}</P>
            <ColorPicker
              color={color}
              colors={smallColorSet}
              onChooseColor={this.handleColorChange}
              enableMoreColors={false}
            />
          </BoxOptions>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default injectIntl(PluralOptions);
