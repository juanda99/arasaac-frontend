import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import muiThemeable from "material-ui/styles/muiThemeable";
import OptionsOff from "material-ui/svg-icons/navigation/chevron-right";
import OptionsOn from "material-ui/svg-icons/navigation/expand-more";
import IconButton from "material-ui/IconButton";
import Toggle from "material-ui/Toggle";

class ToggleDropdown extends PureComponent {
  state = { showExtra: false };

  handleOnToggle = (event, toggled) => {
    this.props.onToggle(toggled);
  };
  handleClick = () => {
    this.props.onClick();
  };

  renderExtra = () =>
    this.props.showOptions ? (
      <IconButton
        style={{ position: "absolute", left: "200px", top: "3px" }}
        onClick={this.handleClick}
      >
        <OptionsOn color={this.props.muiTheme.palette.primary1Color} />
      </IconButton>
    ) : (
      <IconButton
        style={{ position: "absolute", left: "200px", top: "3px" }}
        onClick={this.handleClick}
      >
        <OptionsOff color={this.props.muiTheme.palette.primary1Color} />
      </IconButton>
    );

  render() {
    const { toggled, style, label } = this.props;
    return (
      <div style={{ display: "flex", flexWrap: "wrap", position: "relative" }}>
        <Toggle
          label={label}
          labelPosition="right"
          style={style}
          toggled={toggled}
          onToggle={this.handleOnToggle}
        />
        {toggled ? this.renderExtra() : ""}
      </div>
    );
  }
}

ToggleDropdown.propTypes = {
  muiTheme: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  toggled: PropTypes.bool.isRequired,
  showOptions: PropTypes.bool.isRequired,
  style: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

export default muiThemeable()(ToggleDropdown);
