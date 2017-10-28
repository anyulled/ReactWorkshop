/**
 * Created by anyulled on 12/7/17.
 */
import {mount, configure} from "enzyme";
import WeatherForecast from "./WeatherForecast";
import React from "react";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

describe("WeatherForecast", () => {
    it("should render properly", () => {
        const props = {
            loading: false,
            city: "Valencia",
            loadData: () => {},
            errorData: () => {}
        };
        const wrapper = mount(<WeatherForecast {...props}/>);
        expect(wrapper.find("h1").text()).toBe("CityValencia");
        expect(wrapper.find("small").text()).toBe("Valencia");
    });
});