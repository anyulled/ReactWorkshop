import React from "react";
import App from "./App";
import {configure, mount, render, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-15";

describe("App", () => {
    beforeAll(() => {
        configure({adapter: new Adapter()});
    });

    it("renders without crashing", () => {
        expect(shallow(<App/>).find("div").length).toBe(1);
        expect(shallow(<App/>).find("PageHeader").length).toBe(1);
        expect(shallow(<App/>).find("Grid").length).toBe(1);
    });

    it("should mount in a full DOM", () => {
        expect(mount(<App/>).find(".glyphicon").length).toBe(1);
    });

    it("should render to static HTML", () => {
        expect(render(<App/>).text()).toContain("Weather App");
    });

    it("should modify a city", () => {
        const wrapper = shallow(<App/>);
        wrapper.instance().modifyCity("Arizona");
        expect(wrapper.state("city")).toBe("Arizona");
    });
});
