import { shallow } from "enzyme";
import React from "react";

import FullWidthSection from "../index";

const children = <h1>Test</h1>;
const renderComponent = (props = {}) =>
  shallow(<FullWidthSection {...props}>{children}</FullWidthSection>);

describe("<FullWidthSection />", () => {
  it("should render a <div> tag", () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.type()).toEqual("div");
  });

  it("should have children", () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it("should have a className attribute", () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.prop("className")).toBeDefined();
  });
  it("should adopt a valid attribute", () => {
    const id = "test";
    const renderedComponent = shallow(<FullWidthSection id={id} />);
    expect(renderedComponent.prop("id")).toEqual(id);
  });

  it("should not adopt an invalid attribute", () => {
    const renderedComponent = shallow(<FullWidthSection attribute={"test"} />);
    expect(renderedComponent.prop("attribute")).toBeUndefined();
  });
});
