import React, { Component } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    ></div>
  );
}

class ImageSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    const carousel = this.props.images.map((image) => (
      <div>
        <img src={image} alt="" style={{ width: "100%" }} />
      </div>
    ));
    return (
      <div>
        <Slider {...settings}>{carousel}</Slider>
      </div>
    );
  }
}

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageSlider;
