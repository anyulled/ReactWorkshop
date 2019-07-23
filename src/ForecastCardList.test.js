import ForecastCardList from "./ForecastCardList";
import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

describe("<ForecastCardList/>", () => {
    beforeAll(() => {
        configure({adapter: new Adapter()});
    });
    it("should mount correctly", () => {
        const forecastList = [{date: 1}, {date: 2}, {date: 3}, {date: 4}];
        const wrapper = shallow(<ForecastCardList forecast={forecastList}/>);
        expect(wrapper.find("Grid").length).toBe(1);
        expect(wrapper.find("Row").length).toBe(1);
        expect(wrapper.find("Col").length).toBe(forecastList.length);
        expect(wrapper.find("WeatherCard").length).toBe(forecastList.length);
    });
});