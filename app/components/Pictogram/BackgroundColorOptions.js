/* eslint no-mixed-operators: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import P from "components/P";
import { colorSet } from "utils/colors";
import ColorPicker from "./ColorPicker";
import BoxOptions from "./BoxOptions";
import ToggleDropDown from "./ToggleDropdown";
import messages from "./messages";
import styles from "./styles";

class BackgroundColorOptions extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    onChoose: PropTypes.func.isRequired,
    onActive: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    showOptions: PropTypes.bool.isRequired,
    onOptionsShow: PropTypes.func.isRequired,
  };

  state = {
    showMoreColors: false,
  };

  handleActive = (active) => this.props.onActive(active);

  handleOptionsShow = () => this.props.onOptionsShow(!this.props.showOptions);

  handleColorChange = (color) => this.props.onChoose(color);

  handleShowMoreColors = () =>
    this.setState({ showMoreColors: !this.state.showMoreColors });

  render() {
    const { intl, color, active, showOptions } = this.props;
    const { formatMessage } = intl;
    const { showMoreColors } = this.state;
    let marginBottom = "auto";
    if (showOptions) {
      marginBottom = showMoreColors ? "380px" : "170px";
    }
    return (
      <div style={{ marginBottom }}>
        <ToggleDropDown
          toggled={active}
          onToggle={this.handleActive}
          label={formatMessage(messages.backgroundColor)}
          style={styles.toggle}
          showOptions={showOptions}
          onClick={this.handleOptionsShow}
        />
        {showOptions ? (
          <BoxOptions>
            <P>{formatMessage(messages.chooseColor)}</P>
            <ColorPicker
              color={color}
              colors={colorSet}
              onChooseColor={this.handleColorChange}
              showMoreColors={showMoreColors}
              onShowMoreColors={this.handleShowMoreColors}
            />
          </BoxOptions>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default injectIntl(BackgroundColorOptions);
