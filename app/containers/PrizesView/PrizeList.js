import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import PrizeSnippet from "./PrizeSnippet";

export class PrizeList extends PureComponent {
  render() {
    const { prizes } = this.props;

    return (
      <ul>
        {prizes.map((prize, index) => (
          <PrizeSnippet key={`${prize.image}-${index}`} prize={prize} />
        ))}
      </ul>
    );
  }
}

PrizeList.propTypes = {
  prizes: PropTypes.arrayOf(PropTypes.object),
};

export default PrizeList;
