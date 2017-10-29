import React from "react";
import Header from "./Header";
import {shallow} from "enzyme";

describe("Header", () => {
    it("Renders properly with props", () => {
        const city = "Barcelona";
        const wrapper = shallow(<Header city={city}/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find("PageHeader").childAt(2).text()).toContain(city);
    });

    it("Renders properly without props", () => {
        const city = undefined;
        const wrapper = shallow(<Header city={city}/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find("PageHeader").childAt(2).text()).toContain("Weather App");
    });
});