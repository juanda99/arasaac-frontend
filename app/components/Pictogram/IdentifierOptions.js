/* eslint no-mixed-operators: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { smallColorSet } from "utils/colors";
import P from "components/P";
import BoxOptions from "./BoxOptions";
import ToggleDropDown from "./ToggleDropdown";
import messages from "./messages";
import styles from "./styles";
import ColorPicker from "./ColorPicker";

class IdentifierOptions extends Component {
  static propTypes = {
    identifier: PropTypes.string,
    identifierPosition: PropTypes.string,
    intl: intlShape.isRequired,
    onIdentifierChange: PropTypes.func.isRequired,
    onIdentifierPositionChange: PropTypes.func.isRequired,
    onActive: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    showOptions: PropTypes.bool.isRequired,
    onOptionsShow: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    onColorChange: PropTypes.func.isRequired,
  };

  // bgColor means isInputChecked
  handleActive = (active) => this.props.onActive(active);

  handleOptionsShow = () => this.props.onOptionsShow(!this.props.showOptions);

  handleIdentifierChange = (event, index, identifier) =>
    this.props.onIdentifierChange(identifier);

  handleIdentifierPositionChange = (event, index, identifierPosition) =>
    this.props.onIdentifierPositionChange(identifierPosition);

  handleColorChange = (color) => this.props.onColorChange(color);

  render() {
    const {
      intl,
      identifier,
      active,
      showOptions,
      identifierPosition,
      color,
    } = this.props;
    const { formatMessage } = intl;
    const marginBottom = showOptions ? "310px" : "auto";
    return (
      <div style={{ marginBottom }}>
        <ToggleDropDown
          toggled={active}
          onToggle={this.handleActive}
          label={formatMessage(messages.identifier)}
          style={styles.toggle}
          showOptions={showOptions}
          onClick={this.handleOptionsShow}
        />
        {showOptions ? (
          <BoxOptions>
            <P marginBottom="0px">{formatMessage(messages.chooseIdentifier)}</P>
            <SelectField
              style={{ marginRight: "40px" }}
              value={identifier}
              onChange={this.handleIdentifierChange}
            >
              <MenuItem
                value="classroom"
                primaryText={formatMessage(messages.classroom)}
              />
              <MenuItem
                value="health"
                primaryText={formatMessage(messages.health)}
              />
              <MenuItem
                value="health_color"
                primaryText={formatMessage(messages.healthColor)}
              />
              <MenuItem
                value="library"
                primaryText={formatMessage(messages.library)}
              />
              <MenuItem
                value="office"
                primaryText={formatMessage(messages.office)}
              />
            </SelectField>
            <P marginBottom="0px">{formatMessage(messages.choosePosition)}</P>
            <SelectField
              style={{ marginRight: "40px" }}
              value={identifierPosition}
              onChange={this.handleIdentifierPositionChange}
            >
              <MenuItem
                value="left"
                primaryText={formatMessage(messages.left)}
              />
              <MenuItem
                value="right"
                primaryText={formatMessage(messages.right)}
              />
            </SelectField>
            {identifier === "health_color" ? (
              ""
            ) : (
              <div>
                <P>{<FormattedMessage {...messages.chooseColor} />}</P>
                <ColorPicker
                  color={color}
                  colors={smallColorSet}
                  onChooseColor={this.handleColorChange}
                  enableMoreColors={false}
                />
              </div>
            )}
          </BoxOptions>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default injectIntl(IdentifierOptions);
