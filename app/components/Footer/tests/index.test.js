import React from "react";
import { shallow } from "enzyme";
import styles from "../styles";
import GobiernoAragon from "../gobierno-aragon-logo.svg";

import Footer from "../index";
import FooterSection from "../FooterSection";

describe("<Footer />", () => {
  it("should render the logos", () => {
    const renderedComponent = shallow(<Footer docked={true} />);
    expect(renderedComponent.find("img").length).toEqual(2);
  });

  it("should render Arasaac Logo", () => {
    const renderedComponent = shallow(<Footer docked={true} />);
    expect(
      renderedComponent.contains(
        <img alt="Arasaac Logo" style={styles.logoGA} src={GobiernoAragon} />
      )
    ).toEqual(true);
  });

  it("should render a FooterSection", () => {
    const renderedComponent = shallow(<Footer docked={true} />);
    expect(renderedComponent.type()).toEqual(FooterSection);
  });

  it("should accept {docked:true} prop", () => {
    const docked = true;
    const renderedComponent = shallow(<Footer docked={docked} />);
    expect(renderedComponent.prop("docked")).toEqual(docked);
  });
  it("should accept {docked:false} prop", () => {
    const docked = false;
    const renderedComponent = shallow(<Footer docked={docked} />);
    expect(renderedComponent.prop("docked")).toEqual(docked);
  });
});
