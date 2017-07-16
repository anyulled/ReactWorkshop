/**
 * Created by anyulled on 12/7/17.
 */
import React from "react";
import {shallow, mount} from "enzyme";
import WeatherCard from "./WeatherCard";
import {Panel} from "react-bootstrap";

describe("WeatherCard", () => {
    const props = {
        weather: {
            icon: "",
            date: 1499860800,
            description: "no description available",
            minTemp: 0,
            maxTemp: 99,
            humidity: 50
        }
    };
    it("should shallow render", () => {
        const wrapper = shallow(<WeatherCard weather={props}/>);
        expect(wrapper.find(Panel).length).toEqual(1);
    });

    it("should render in dom", () => {
        const wrapper = mount(<WeatherCard weather={props}/>);
        expect(wrapper.find("img").length).toEqual(1);
        expect(wrapper.find("p").length).toEqual(4);
    });
});
