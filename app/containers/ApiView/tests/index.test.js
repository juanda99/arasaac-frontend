// import { ApiView } from '../index';

import View from "components/View";
// import Iframe from 'react-iframe'
import { shallow } from "enzyme";
import React from "react";
import ApiView from "../index";

describe("<ApiView />", () => {
  /*  it('should render an Iframe', () => {
    const wrapper = shallow(<ApiView />)
    expect(wrapper.find(Iframe)).toHaveLength(1)
  })*/
  it("should render a View", () => {
    const wrapper = shallow(<ApiView />);
    expect(wrapper.find(View)).toHaveLength(1);
  });
});
