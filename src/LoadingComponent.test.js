import LoadingComponent from "./LoadingComponent";
import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

describe("<LoadingComponent/>", () => {
    beforeAll(() => {
        configure({adapter: new Adapter()});
    });
    it("should mount correctly", () => {
        const loading = false;
        const city = "Beirut";
        const wrapper = shallow(<LoadingComponent loading={loading} city={city}/>);
        expect(wrapper.find("h1").length).toBe(1);
        expect(wrapper.find("small").length).toBe(1);
        expect(wrapper.find("h1").text()).toBe("City Beirut");
    });
    it("it should display a progress bar whenever is loading", () => {
        const loading = true;
        const city = "Beirut";
        const wrapper = shallow(<LoadingComponent loading={loading} city={city}/>);
        expect(wrapper.find("ProgressBar").length).toBe(1);
        expect(wrapper.find("h1").length).toBe(0);
    });
});