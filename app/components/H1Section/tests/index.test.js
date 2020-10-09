import { shallow } from "enzyme";
import React from "react";

import Component from "../index";

const children = "Text for testing";
const renderComponent = (props = {}) =>
  shallow(<Component {...props}>{children}</Component>);

describe("<H1Section />", () => {
  it("should render a <h1> tag", () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.type()).toEqual("h1");
  });
  it("should have children", () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it("should have a className attribute", () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.prop("className")).toBeDefined();
  });
  it("should render a valid attribute", () => {
    const id = "test";
    const renderedComponent = renderComponent({ id });
    expect(renderedComponent.prop("id")).toEqual(id);
  });

  it("should not render an invalid attribute", () => {
    const attribute = "test";
    const renderedComponent = renderComponent({ attribute });
    expect(renderedComponent.prop("attribute")).toBeUndefined();
  });
});
