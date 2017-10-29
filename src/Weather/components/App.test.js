import React from "react";
import App from "./App";
import {shallow} from "enzyme";

describe("App", () => {
    it("Renders properly", () => {
        const wrapper = shallow(<App/>);
        expect(wrapper).toMatchSnapshot();
    });

    it("displays both weather and statistics container", () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.find("Connect(Header)").exists()).toBe(true);
        expect(wrapper.find("Connect(WeatherForecast)").exists()).toBe(true);
        expect(wrapper.find("Connect(Statistics)").exists()).toBe(true);
    });
});