export default class ZoomSlider extends Component {
  state = {
    firstSlider: 0.5,
    secondSlider: 50,
  };

  handleFirstSlider = (event, value) => {
    this.setState({ firstSlider: value });
  };

  handleSecondSlider = (event, value) => {
    this.setState({ secondSlider: value });
  };

  render() {
    return (
      <div>
        <Slider
          value={this.state.firstSlider}
          onChange={this.handleFirstSlider}
        />
        <p>
          <span>{"The value of this slider is: "}</span>
          <span>{this.state.firstSlider}</span>
          <span>{" from a range of 0 to 1 inclusive"}</span>
        </p>
        <Slider
          min={0}
          max={100}
          step={1}
          value={this.state.secondSlider}
          onChange={this.handleSecondSlider}
        />
        <p>
          <span>{"The value of this slider is: "}</span>
          <span>{this.state.secondSlider}</span>
          <span>{" from a range of 0 to 100 inclusive"}</span>
        </p>
      </div>
    );
  }
}
