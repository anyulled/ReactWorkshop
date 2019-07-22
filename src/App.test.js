import React from "react";
import App from "./App";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

describe("App", () => {
    let wrapper;
    beforeAll(() => {
        configure({adapter: new Adapter()});
    });
    beforeEach(() => {
        wrapper = shallow(<App/>);
    });

    it("renders without crashing", () => {
        expect(wrapper.find("div")).toHaveLength(1);
        expect(wrapper.find("PageHeader")).toHaveLength(1);
        expect(wrapper.find("PageHeader").dive().text()).toContain("Weather App");
        expect(wrapper.find("Grid")).toHaveLength(1);
    });

    it("should mount in a full DOM", () => {
        expect(wrapper.find("Glyphicon")).toHaveLength(1);
    });

    it("should render to static HTML", () => {
        expect(wrapper.find("Grid")).toHaveLength(1);
    });

    it("should modify a city", () => {
        expect(wrapper.find("WeatherForecast")).toHaveLength(1);
    });
});
