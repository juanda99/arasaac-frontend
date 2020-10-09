import React, { Component } from "react";
import CustomImageProgress from "./CustomImageProgress";

export default class ImageProgress extends Component {
  state = {
    completed: 0,
  };

  componentDidMount() {
    this.timer = setTimeout(() => this.progress(5), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({ completed: 100 });
    } else {
      this.setState({ completed });
      const diff = Math.random() * 10;
      this.timer = setTimeout(() => this.progress(completed + diff), 1000);
    }
  }

  render() {
    return (
      <CustomImageProgress mode="determinate" value={this.state.completed} />
    );
  }
}
