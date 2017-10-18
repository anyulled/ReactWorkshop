import WeatherCard from "./WeatherCard";
import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-15";

describe("WeatherCard", () => {
    beforeAll(() => {
        configure({adapter: new Adapter()});

    });
    it("Should mount correctly", () => {
        const props = {
            weather: {
                icon: "",
                date: new Date(),
                description: "sunny",
                minTemp: 0,
                maxTemp: 99,
                humidity: 50
            }
        };
        const wrapper = shallow(<WeatherCard weather={props}/>);
        expect(wrapper.find("Panel").length).toBe(1);
        expect(wrapper.find("p").length).toBe(4);
        expect(wrapper.find("p").first().text()).toContain("Description");
        expect(wrapper.find("p").at(1).text()).toContain("Minimum");
        expect(wrapper.find("p").at(2).text()).toContain("Maximum");
        expect(wrapper.find("p").last().text()).toContain("Humidity");
    });
});