import React from "react";
import {Provider} from "react-redux";
import {mount} from "enzyme";
import StatisticsContainer from "./StatisticsContainer";
import {weatherActionType} from "../store/weatherActions";
import Statistics from "../components/Statistics";
import store from "../store/store";

describe("HeaderContainer", () => {
    it("renders correctly", () => {
        store.dispatch({
            type: weatherActionType.WEATHER_LOAD,
            payload: {
                city: "Barcelona",
                forecast: [
                    {
                        icon: "",
                        date: new Date().getMilliseconds(),
                        description: "cielo claro",
                        minTemp: 10,
                        maxTemp: 30,
                        humidity: 90
                    }, {
                        icon: "",
                        date: new Date().getMilliseconds(),
                        description: "cielo claro",
                        minTemp: 12,
                        maxTemp: 40,
                        humidity: 45
                    }
                ]
            }
        });

        const wrapper = mount(<Provider store={store}><StatisticsContainer/></Provider>);
        expect(wrapper.find("Connect(Statistics)").exists()).toBeTruthy();
        expect(wrapper.find("Statistics").prop("error")).toEqual(false);
        expect(wrapper.find("Statistics").prop("loading")).toEqual(false);
        expect(wrapper.find("Statistics").prop("rainyDays")).toEqual(0);
        expect(wrapper.find("Statistics").prop("sunnyDays")).toEqual(2);
    });
});