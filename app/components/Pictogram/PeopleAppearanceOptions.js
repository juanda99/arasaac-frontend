/* eslint no-mixed-operators: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { getKeyByValue } from "utils";
import P from "components/P";
import ColorPicker from "./ColorPicker";
import ToggleDropDown from "./ToggleDropdown";
import messages from "./messages";
import styles from "./styles";
import BoxOptions from "./BoxOptions";

class PeopleAppearanceOptions extends Component {
  static propTypes = {
    skin: PropTypes.string,
    hair: PropTypes.string,
    intl: intlShape.isRequired,
    onSkinChange: PropTypes.func.isRequired,
    onHairChange: PropTypes.func.isRequired,
    onActive: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    showOptions: PropTypes.bool.isRequired,
    onOptionsShow: PropTypes.func.isRequired,
  };

  // bgColor means isInputChecked
  handleActive = (active) => this.props.onActive(active);

  handleOptionsShow = () => this.props.onOptionsShow(!this.props.showOptions);

  handleSkinChange = (color) => {
    const skin = getKeyByValue(this.skin, color.toUpperCase());
    this.props.onSkinChange(skin);
  };

  handleHairChange = (color) => {
    const hair = getKeyByValue(this.hair, color.toUpperCase());
    this.props.onHairChange(hair);
  };

  skin = {
    white: "#F5E5DE",
    black: "#A65C17",
    assian: "#F4ECAD",
    mulatto: "#E3AB72",
    aztec: "#CF9D7C",
  };

  hair = {
    brown: "#A65E26",
    blonde: "#FDD700",
    red: "#ED4120",
    black: "#020100",
    gray: "#EFEFEF",
    darkGray: "#AAABAB",
    darkBrown: "#6A2703",
  };

  render() {
    const { intl, skin, active, showOptions, hair } = this.props;
    const { formatMessage } = intl;
    const marginBottom = showOptions ? "200px" : "auto";
    return (
      <div style={{ marginBottom }}>
        <ToggleDropDown
          toggled={active}
          onToggle={this.handleActive}
          label={formatMessage(messages.peopleAppearance)}
          style={styles.toggle}
          showOptions={showOptions}
          onClick={this.handleOptionsShow}
        />
        {showOptions ? (
          <BoxOptions>
            <P>{formatMessage(messages.skinColor)}</P>
            <ColorPicker
              color={this.skin[skin]}
              colors={Object.values(this.skin)}
              onChooseColor={this.handleSkinChange}
              enableMoreColors={false}
            />
            <P>{formatMessage(messages.hairColor)}</P>
            <ColorPicker
              color={this.hair[hair]}
              colors={Object.values(this.hair)}
              onChooseColor={this.handleHairChange}
              enableMoreColors={false}
              width={310}
            />
          </BoxOptions>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default injectIntl(PeopleAppearanceOptions);
