import React from "react";
import renderer from "react-test-renderer";
import Component from "../index";

describe("<ShareBar />", () => {
  it("renders correctly", () => {
    const props = {
      shareUrl: "http://localhost:3000/testURL",
      title: "Test title",
      image: "test.jpg",
    };
    const tree = renderer.create(<Component {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
