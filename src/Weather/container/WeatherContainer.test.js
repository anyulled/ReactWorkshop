/**
 * Created by anyulled on 15/7/17.
 */
import React from "react";
import {Provider} from "react-redux";
import {mount} from "enzyme";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import reducer from "../store/weatherReducer";
import WeatherContainer from "./WeatherContainer";
import WeatherForeCast from "../components/WeatherForecast";

describe("Weather Container", () => {
    let WrapperContainer,
        WrapperForecast,
        wrapper;
    const store = createStore(reducer, applyMiddleware(thunk));

    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>
                <WeatherContainer/>
            </Provider>
        );
        WrapperContainer = wrapper.find(WeatherContainer);
        WrapperForecast = WrapperContainer.find(WeatherForeCast);
    });

    it("should render Container and Component", () => {
        expect(WrapperForecast.length).toBeTruthy();
        expect(WrapperContainer.length).toBeTruthy();
    });

    it("should be able to call loadData as a prop function", () => {
        console.log(WrapperForecast.instance().loadForecastByCoords(2, 3));

    });
});
