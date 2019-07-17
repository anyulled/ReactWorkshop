import WeatherCard from "./WeatherCard";
import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

describe("WeatherCard", () => {
    beforeAll(() => {
        configure({adapter: new Adapter()});

    });
    it("Should mount correctly", () => {
        const props = {
            icon: "",
            date: new Date().getMilliseconds(),
            description: "sunny",
            minTemp: 34,
            maxTemp: 99,
            humidity: 50
        };
        const wrapper = shallow(<WeatherCard weather={props}/>);
        expect(wrapper.find("Panel").length).toBe(1);
        expect(wrapper.find("p").length).toBe(4);
        expect(wrapper.find("p").first().text()).toContain(`Description: ${props.description}`);
        expect(wrapper.find("p").at(1).text()).toContain(`Minimum: ${props.minTemp}º C`);
        expect(wrapper.find("p").at(2).text()).toContain(`Maximum: ${props.maxTemp}º C`);
        expect(wrapper.find("p").last().text()).toContain(`Humidity: ${props.humidity}%`);
    });
});