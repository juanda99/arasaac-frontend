import React from "react";
import PropTypes from "prop-types";
import ChipInput from "material-ui-chip-input";
import AutoComplete from "material-ui/AutoComplete";
import { List } from "immutable";

class CustomChipInput extends React.Component {
  handleRequestAdd(chip) {
    const { input } = this.props;
    let chips;
    if (List.isList(input.value)) chips = input.value.toJS();
    else chips = input.value || [];
    // const chips = this.props.input.value || []
    // we can't save chip as it is. If its entered by keyboard, value=text, so we need
    // to calculate its value:
    const verifyChip = this.props.dataSource.filter(
      (item) => item.text === chip.text
    );
    // if its already present, we don't add it
    const duplicated = chips.some((item) => item.text === chip.text);
    // if its already entered, we don't put it again
    if (verifyChip.length && !duplicated) {
      if (verifyChip[0].text.includes(" / ")) {
        const splitChipText = verifyChip[0].text.split(" / ");
        const parentChip = this.props.dataSource.filter(
          (item) => item.text === splitChipText[0]
        )[0];
        // if not present we add it:
        const duplicatedParent = chips.some(
          (item) => item.text === parentChip.text
        );
        if (!duplicatedParent) chips.push(parentChip);
        chips.push({ value: verifyChip[0].value, text: splitChipText[1] });
      } else {
        chips.push(verifyChip[0]);
      }
      this.props.input.onChange(chips);
    }
  }

  handleRequestDelete(deletedChip) {
    const { input } = this.props;
    let chips;
    if (List.isList(input.value)) chips = input.value.toJS();
    else chips = input.value || [];
    // let chips = this.props.input.value || []
    chips = chips.filter((c) => c.value !== deletedChip);
    this.props.input.onChange(chips);
  }

  render() {
    const { dataSource, hintText, floatingLabelText, input } = this.props;
    let chips;
    if (List.isList(input.value)) chips = input.value.toJS();
    else chips = input.value || [];
    return (
      <ChipInput
        {...this.props}
        value={chips}
        onRequestAdd={(chip) => this.handleRequestAdd(chip)}
        onRequestDelete={(deletedChip) => this.handleRequestDelete(deletedChip)}
        dataSource={dataSource}
        dataSourceConfig={{ text: "text", value: "value" }}
        onBlur={() => input.onBlur()}
        hintText={hintText}
        floatingLabelText={floatingLabelText}
        filter={AutoComplete.fuzzyFilter}
        fullWidth
        listStyle={{ maxHeight: 300, overflow: "auto", width: 400 }}
        openOnFocus
      />
    );
  }
}

CustomChipInput.propTypes = {
  input: PropTypes.object.isRequired,
  hintText: PropTypes.object.isRequired,
  floatingLabelText: PropTypes.object.isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default CustomChipInput;
