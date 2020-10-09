import React from "react";
import { shallow } from "enzyme";

import FooterSection from "../FooterSection";

describe("<FooterSection />", () => {
  it("should render a <div> tag", () => {
    const renderedComponent = shallow(<FooterSection />);
    expect(renderedComponent.type()).toEqual("div");
  });

  it("should have a className attribute", () => {
    const renderedComponent = shallow(<FooterSection />);
    expect(renderedComponent.prop("className")).toBeDefined();
  });
  it("should adopt a valid attribute", () => {
    const id = "test";
    const renderedComponent = shallow(<FooterSection id={id} />);
    expect(renderedComponent.prop("id")).toEqual(id);
  });

  it("should not adopt an invalid attribute", () => {
    const renderedComponent = shallow(<FooterSection attribute={"test"} />);
    expect(renderedComponent.prop("attribute")).toBeUnefined();
  });
});
