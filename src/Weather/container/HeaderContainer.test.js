import React from "react";
import {Provider} from "react-redux";
import {mount} from "enzyme";
import HeaderContainer from "./HeaderContainer";
import store from "../store/store";

describe("HeaderContainer", () => {
    it("renders correctly", () => {
        const wrapper = mount(<Provider store={store}><HeaderContainer/></Provider>);
        expect(wrapper.find("Connect(Header)").exists()).toBeTruthy();
        expect(wrapper.find("Header").prop("city")).toEqual("");
    });
});