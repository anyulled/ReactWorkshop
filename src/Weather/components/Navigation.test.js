import React from "react";
import Navigation from "./Navigation";
import {shallow} from "enzyme";

describe("Navigation", () => {
    it("renders properly", () => {
        const wrapper = shallow(<Navigation/>);
        expect(wrapper).toMatchSnapshot();
    });
});