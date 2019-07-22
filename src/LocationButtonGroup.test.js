import {LocationButtonGroup} from "./LocationButtonGroup";
import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

describe("<CityForm/>", () => {
    let wrapper, clearMock, changeMock;
    beforeAll(() => {
        configure({adapter: new Adapter()});
    });
    beforeEach(() => {
        clearMock = jest.fn();
        changeMock = jest.fn();
        wrapper = shallow(<LocationButtonGroup clearDataHandler={clearMock} currentLocationHandler={changeMock}/>);
    });
    it("should mount correctly", () => {
        expect(wrapper.find("ButtonGroup").length).toBe(1);
        expect(wrapper.find("Button").length).toBe(2);
        expect(wrapper.find("Button").first().prop("onClick")).toBe(clearMock);
        expect(wrapper.find("Button").at(1).prop("onClick")).toBe(changeMock);
    });
    it("should handle clicks correctly", () => {
        wrapper.find("Button").first().simulate("click");
        expect(clearMock.mock.calls).toHaveLength(1);
        wrapper.find("Button").at(1).simulate("click");
        expect(changeMock.mock.calls).toHaveLength(1);

    });
});