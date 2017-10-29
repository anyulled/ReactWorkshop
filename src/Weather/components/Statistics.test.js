import React from "react";
import Statistics from "./Statistics";
import {shallow} from "enzyme";

describe("Statistics", () => {
    it("Renders properly", () => {
        const wrapper = shallow(<Statistics/>);
        expect(wrapper).toMatchSnapshot();
    });

    it("should display sunny and rainy days correctly", () => {
        const props = {
            sunnyDays: 50,
            rainyDays: 10
        };
        const wrapper = shallow(<Statistics {...props}/>);
        expect(wrapper.find("ListGroupItem").at(0).html()).toContain(`<strong>Sunny Days:</strong> ${props.sunnyDays}</span>`);
        expect(wrapper.find("ListGroupItem").at(1).html()).toContain(`<strong>Rainy Days:</strong> ${props.rainyDays}</span>`);
    });
});