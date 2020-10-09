import { shallow } from "enzyme";
import React from "react";
import { FormattedMessage } from "react-intl";
import FullWidthSection from "components/FullWidthSection";

import messages from "../messages";
import Component from "../index";

const renderComponent = () => shallow(<Component />);

describe("<participate />", () => {
  it("should render a <FullWidthSection> tag", () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.type()).toEqual(FullWidthSection);
  });

  it("should render the colaboration message", () => {
    const renderedComponent = renderComponent();
    expect(
      renderedComponent.contains(<FormattedMessage {...messages.participate} />)
    ).toEqual(true);
  });
});
