import WeatherCard from "./WeatherCard";
import React from "react"
import {shallow} from "enzyme";
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

describe("WeatherCard", () => {
    configure({adapter: new Adapter()});
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
    });
});