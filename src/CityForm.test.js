import CityForm from "./CityForm";
import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

describe("<CityForm/>", () => {
    beforeAll(() => {
        configure({adapter: new Adapter()});
    });
    it("should mount correctly", () => {
        const props = 360630;
        const onChangeHandler = jest.fn();
        const wrapper = shallow(<CityForm value={props} onChange={onChangeHandler}/>);
        expect(wrapper.find("Form").length).toBe(1);
        expect(wrapper.find("FormGroup").length).toBe(1);
        expect(wrapper.find("FormControl").length).toBe(1);
        expect(wrapper.find("FormControl").prop("value")).toBe(props);
        expect(wrapper.find("FormControl").prop("onChange")).toBe(onChangeHandler);
        expect(wrapper.find("option").length).toBe(5);
    });
});