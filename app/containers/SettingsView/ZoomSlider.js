import React, { Component } from "react";
import Slider from "material-ui/Slider";

class ZoomSlider extends Component {
  state = {
    zoom: 1000,
  };

  handleZoom = (event, value) => {
    this.setState({ zoom: value });
  };

  render() {
    return (
      <div>
        <Slider value={this.state.zoom} onChange={this.handleZoom} />
        <p>
          <span>{"The value of this zoom is: "}</span>
          <span>{this.state.firstSlider}</span>
          <span>{"%"}</span>
        </p>
      </div>
    );
  }
}

export default ZoomSlider;
